import { NextRequest } from 'next/server';

import Asset from '../../../../models/Asset';

export const GET = async (request: NextRequest) => {
  const filter: NetworthFilter = request.nextUrl.searchParams.get('filter');
  const agg = 'dayOfWeek';
  const today = new Date();
  let startDate: Date;

  // Determine the start date based on the filter
  switch (filter) {
    case 'week':
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 7);
      break;
    case 'month':
      startDate = new Date(today);
      startDate.setMonth(today.getMonth() - 1);
      break;
    case 'year':
      startDate = new Date(today);
      startDate.setFullYear(today.getFullYear() - 1);
      break;
    case 'all':
      // TODO change to first date of the collection
      startDate = new Date(2000, 0, 1);
      break;
    default:
      throw new Error(
        "Invalid filter type. Use 'week', 'month', 'year', or 'all'."
      );
  }

  // Todo might need to do this if formatted correctly
  // Set dates to the beginning of the day
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);
  startDate.setHours(0);
  startDate.setMinutes(0);
  startDate.setSeconds(0);
  startDate.setMilliseconds(0);

  // Generate a list of all dates in the range
  const dateArray: Date[] = [];
  const currentDate = new Date(startDate);
  while (currentDate <= today) {
    dateArray.push(currentDate);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  try {
    const pipeline = [
      // Step 1: Filter documents for the base total before start date and all totals after start date
      {
        $facet: {
          baseNetworth: [
            {
              $match: {
                createdAt: { $lt: startDate },
              },
            },
            {
              $group: {
                _id: null,
                total: {
                  $sum: {
                    $subtract: [
                      { $ifNull: ['$value', 0] },
                      { $ifNull: ['$cost', 0] },
                    ],
                  },
                },
              },
            },
          ],
          afterStartDateTotals: [
            {
              $match: {
                createdAt: {
                  $gte: startDate,
                  $lte: today,
                },
              },
            },
            {
              $group: {
                _id: {
                  [`$${agg}`]: '$createdAt',
                },
                date: {
                  $first: '$createdAt',
                },
                total: {
                  $sum: {
                    $subtract: [
                      { $ifNull: ['$value', 0] },
                      { $ifNull: ['$cost', 0] },
                    ],
                  },
                },
              },
            },
            {
              $project: {
                date: {
                  $dateTrunc: {
                    date: '$date',
                    unit: 'day',
                    binSize: 1,
                  },
                },
                total: '$total',
              },
            },
          ],
        },
      },

      // Step 2: Simplify the filtered data
      {
        $project: {
          baseNetworth: { $arrayElemAt: ['$baseNetworth.total', 0] },
          existingData: '$afterStartDateTotals',
        },
      },

      // Step 3: Create an array of dates after the start date
      {
        $addFields: {
          dateArray: {
            $map: {
              input: {
                $range: [
                  {
                    $toInt: {
                      $divide: [{ $toLong: startDate }, 1000],
                    },
                  },
                  {
                    $toInt: {
                      $divide: [{ $toLong: today }, 1000],
                    },
                  },
                  86400,
                ],
              },
              as: 'date',
              in: { $toDate: { $multiply: ['$$date', 1000] } },
            },
          },
        },
      },

      // Step 4: Iterate date array and existing data and assign any matches with their diff total or 0
      {
        $addFields: {
          results: {
            $map: {
              input: '$dateArray',
              as: 'date',
              in: {
                date: '$$date',
                diff: {
                  $reduce: {
                    input: '$existingData',
                    initialValue: {
                      total: 0,
                    },
                    in: {
                      $let: {
                        vars: {
                          currentDate: {
                            date: '$$date',
                          },
                          match: {
                            $arrayElemAt: [
                              {
                                $filter: {
                                  input: '$existingData',
                                  as: 'existing',
                                  cond: {
                                    $eq: ['$$existing.date', '$$date'],
                                  },
                                },
                              },
                              0,
                            ],
                          },
                        },
                        // Assign match total if found or 0
                        in: {
                          total: { $ifNull: ['$$match.total', 0] },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },

      // Step 5: Iterate the results array and calculate the cumulated total for each value
      {
        $addFields: {
          cumulatedTotals: {
            $reduce: {
              input: '$results',
              initialValue: {
                newTotal: null,
                totalsArray: [],
              },
              in: {
                $cond: {
                  if: {
                    // No total yet, first iteration
                    $eq: ['$$value.newTotal', null],
                  },
                  then: {
                    // Set first total and add to array
                    newTotal: {
                      $add: ['$$this.diff.total', '$baseNetworth'],
                    },
                    totalsArray: {
                      $concatArrays: [
                        '$$value.totalsArray',
                        [
                          {
                            date: '$$this.date',
                            total: {
                              $add: ['$$this.diff.total', '$baseNetworth'],
                            },
                          },
                        ],
                      ],
                    },
                  },
                  else: {
                    $let: {
                      vars: {
                        // Add total and current value
                        cumulatedTotal: {
                          $add: ['$$value.newTotal', '$$this.diff.total'],
                        },
                      },
                      in: {
                        // Set new total and add to array
                        newTotal: '$$cumulatedTotal',
                        totalsArray: {
                          $concatArrays: [
                            '$$value.totalsArray',
                            [
                              {
                                date: '$$this.date',
                                total: '$$cumulatedTotal',
                              },
                            ],
                          ],
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },

      // Step 6: Add field for the new total networth
      {
        $addFields: {
          newTotal: {
            $arrayElemAt: [
              '$cumulatedTotals.totalsArray',
              {
                $subtract: [{ $size: '$cumulatedTotals.totalsArray' }, 1],
              },
            ],
          },
        },
      },

      // Step 7: Simplify the results and map date and total
      {
        $project: {
          baseTotal: '$baseNetworth',
          newTotal: '$newTotal.total',
          results: {
            $map: {
              input: '$cumulatedTotals.totalsArray',
              as: 'result',
              in: {
                date: '$$result.date',
                total: '$$result.total',
              },
            },
          },
        },
      },
    ];

    const data = await Asset.aggregate(pipeline).exec();

    return new Response(JSON.stringify({ networth: data[0] || [] }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
