import { NextRequest } from 'next/server';
import mongoose from 'mongoose';

import Asset from '../../../../models/Asset';

type DateFilter = 'week' | 'month' | 'year' | 'all';

export const GET = async (request: NextRequest) => {
  const filter: DateFilter = request.nextUrl.searchParams.get('filter');
  const today = new Date();
  let startDate: Date;
  let networth = [];
  const date = new Date();
  const agg = 'dayOfWeek';

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

  console.log('dateArray');
  console.log(dateArray);

  try {
    // ORIGINAL
    networth = await Asset.aggregate([
      {
        $facet: {
          // Get networth before filtered date
          prevTotalNetworth: [
            {
              $match: {
                createdAt: {
                  $lt: date,
                },
              },
            },
            {
              $group: {
                _id: null,
                value: {
                  $sum: {
                    $subtract: ['$value', '$cost'],
                  },
                },
              },
            },
          ],
          results: [
            // Get all results greater than filtered date
            {
              $match: {
                createdAt: {
                  $gt: date,
                },
              },
            },
            // Group results by date and get the total networth and first date for each group
            {
              $group: {
                _id: {
                  [`$${agg}`]: '$createdAt',
                },
                timestamp: { $first: '$createdAt' },
                total: {
                  $sum: {
                    $subtract: ['$value', '$cost'],
                  },
                },
              },
            },
            // Sort by asc - earliest date
            {
              $sort: {
                timestamp: 1,
              },
            },
            // Group by id and create dates and totals arrays
            {
              $group: {
                _id: '',
                dates: {
                  $push: {
                    $dateTrunc: {
                      date: '$timestamp',
                      unit: 'day',
                      binSize: 1,
                    },
                  },
                },
                totals: {
                  $push: {
                    $sum: '$total',
                  },
                },
              },
            },
            // Use totals array to add up the cumulated value betweeen each date group
            {
              $addFields: {
                cumulatedValues: {
                  $reduce: {
                    input: '$totals',
                    initialValue: {
                      total: null,
                      values: [],
                    },
                    in: {
                      $cond: {
                        if: {
                          // No total yet, first iteration
                          $eq: ['$$value.total', null],
                        },
                        then: {
                          // Set first total and add to array
                          total: '$$this',
                          values: {
                            $concatArrays: ['$$value.values', ['$$this']],
                          },
                        },
                        else: {
                          $let: {
                            vars: {
                              // Add total and current value
                              cumulatedTotal: {
                                $add: ['$$value.total', '$$this'],
                              },
                            },
                            in: {
                              // Set new total and add to array
                              total: '$$cumulatedTotal',
                              values: {
                                $concatArrays: [
                                  '$$value.values',
                                  ['$$cumulatedTotal'],
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
          ],
        },
      },
      // Tidy up and assign fields
      {
        $unwind: {
          path: '$prevTotalNetworth',
          preserveNullAndEmptyArrays: true,
        },
      },
      { $unwind: '$results' },
      {
        $project: {
          _id: 0,
          prevTotal: '$prevTotalNetworth.value',
          results: {
            $map: {
              input: { $range: [0, { $size: '$results.dates' }] },
              as: 'index',
              in: {
                timestamp: { $arrayElemAt: ['$results.dates', '$$index'] },
                total: {
                  $arrayElemAt: ['$results.totals', '$$index'],
                },
              },
            },
          },
        },
      },
    ]);

    const pipeline = [
      // Step 1: Filter documents based on the date range
      {
        $match: {
          createdAt: { $gte: startDate, $lte: today },
        },
      },
      // Step 2: Calculate total per document (subtract value - cost)
      {
        $project: {
          date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          total: {
            $subtract: [{ $ifNull: ['$value', 0] }, { $ifNull: ['$cost', 0] }],
          },
        },
      },
      // Step 3: Group by date and sum the total for each day
      {
        $group: {
          _id: '$date',
          total: { $sum: '$total' },
        },
      },
      // Step 4: Format grouped results for easier mapping
      {
        $project: {
          _id: 0,
          date: '$_id',
          total: 1,
        },
      },
      // Step 5: Create the date array for all possible dates in the range
      {
        $addFields: {
          dateArray: {
            $map: {
              input: {
                $range: [
                  { $toInt: { $divide: [{ $toLong: startDate }, 1000] } }, // Convert startDate to seconds
                  { $toInt: { $divide: [{ $toLong: today }, 1000] } }, // Convert today to seconds
                  86400, // Increment by one day (in seconds)
                ],
              },
              as: 'date',
              in: { $toDate: { $multiply: ['$$date', 1000] } }, // Convert seconds back to milliseconds
            },
          },
        },
      },
      // Step 6: Merge existing data with the date array
      {
        $lookup: {
          from: 'assets', // Replace with your actual collection name if different
          pipeline: [
            {
              $match: {
                createdAt: { $gte: startDate, $lte: today },
              },
            },
            {
              $project: {
                date: {
                  $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
                },
                total: {
                  $subtract: [
                    { $ifNull: ['$value', 0] },
                    { $ifNull: ['$cost', 0] },
                  ],
                },
              },
            },
            {
              $group: {
                _id: '$date',
                total: { $sum: '$total' },
              },
            },
            {
              $project: {
                _id: 0,
                date: '$_id',
                total: 1,
              },
            },
          ],
          as: 'existingData',
        },
      },
      // Step 7  get previous total and add cumulated values
      // {
      //   $facet: {
      //     // Get networth before filtered date
      //     prevTotalNetworth: [
      //       {
      //         $match: {
      //           createdAt: {
      //             $lte: startDate,
      //           },
      //         },
      //       },
      //       {
      //         $group: {
      //           _id: null,
      //           value: {
      //             $sum: {
      //               $subtract: ['$value', '$cost'],
      //             },
      //           },
      //         },
      //       },
      //     ],
      //   },
      // },
      // Step 7: Map the results and ensure totals are numeric
      {
        $project: {
          results: {
            $map: {
              input: '$dateArray',
              as: 'date',
              in: {
                date: '$$date',
                total: {
                  $ifNull: [
                    {
                      $arrayElemAt: [
                        {
                          $map: {
                            input: {
                              $filter: {
                                input: '$existingData',
                                as: 'existing',
                                cond: {
                                  $eq: [
                                    '$$existing.date',
                                    {
                                      $dateToString: {
                                        format: '%Y-%m-%d',
                                        date: '$$date',
                                      },
                                    },
                                  ],
                                },
                              },
                            },
                            as: 'filtered',
                            in: '$$filtered.total',
                          },
                        },
                        0,
                      ],
                    },
                    0, // Default to 0 if no matching total exists
                  ],
                },
              },
            },
          },
          // prev: {
          //   $match: {
          //     createdAt: {
          //       $lt: startDate,
          //     },
          //   },
          // },
        },
      },
    ];

    const pipeline2 = [
      // Step 1: Filter documents for the total less than the start date
      {
        $facet: {
          beforeStartDate: [
            {
              $match: {
                createdAt: { $lt: startDate }, // Get totals before the start date
              },
            },
            {
              $group: {
                _id: null,
                totalBeforeStart: {
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
          afterStartDate: [
            {
              $match: {
                createdAt: { $gte: startDate, $lte: today }, // Filter within the range
              },
            },
            {
              $project: {
                date: {
                  $dateTrunc: {
                    date: '$createdAt',
                    unit: 'day',
                    binSize: 1,
                  },
                },
                total: {
                  $subtract: [
                    { $ifNull: ['$value', 0] },
                    { $ifNull: ['$cost', 0] },
                  ],
                },
              },
            },
            {
              $group: {
                _id: '$date',
                total: { $sum: '$total' },
              },
            },
            {
              $project: {
                _id: 0,
                date: '$_id',
                total: 1,
              },
            },
          ],
        },
      },
      // Step 2: Add cumulative totals
      {
        $project: {
          baseTotal: { $arrayElemAt: ['$beforeStartDate.totalBeforeStart', 0] },
          existingData: '$afterStartDate',
        },
      },
      {
        $addFields: {
          dateArray: {
            $map: {
              input: {
                $range: [
                  { $toInt: { $divide: [{ $toLong: startDate }, 1000] } },
                  { $toInt: { $divide: [{ $toLong: today }, 1000] } },
                  86400,
                ],
              },
              as: 'date',
              in: { $toDate: { $multiply: ['$$date', 1000] } },
            },
          },
        },
      },
      {
        $addFields: {
          results: {
            $map: {
              input: '$dateArray',
              as: 'date',
              in: {
                date: '$$date',
                total: {
                  $reduce: {
                    input: '$existingData',
                    initialValue: {
                      cumulatedTotal: {
                        $ifNull: ['$baseTotal', 0],
                      },
                      lastTotal: 0,
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
                        in: {
                          cumulatedTotal: {
                            $add: [
                              { $ifNull: ['$baseTotal', 0] }, // Previous cumulative total
                              { $ifNull: ['$$match.total', 0] }, // Add current day's total if exists
                            ],
                          },
                          lastTotal: { $ifNull: ['$$match.total', 0] },
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
      // Step 4: Simplify the results output
      {
        $project: {
          prevTotal: '$baseTotal',
          results: {
            $map: {
              input: '$results',
              as: 'result',
              in: {
                date: '$$result.date',
                total: '$$result.total.cumulatedTotal',
              },
            },
          },
        },
      },
    ];

    const data = await mongoose.model('Asset').aggregate(pipeline2).exec();

    return new Response(JSON.stringify({ data }), {
      status: 200,
    });

    // return new Response(JSON.stringify({ networth: data[0]?.results || [] }), {
    //   status: 200,
    // });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
