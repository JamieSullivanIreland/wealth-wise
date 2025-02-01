import Asset from '@/models/Asset';

export const GET = async () => {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 7);

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
                  $dayOfWeek: '$createdAt',
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
                  $dateToString: {
                    format: '%Y-%m-%d',
                    date: '$date',
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
                      $divide: [
                        {
                          $toLong: {
                            $dateSubtract: {
                              startDate: today,
                              unit: 'day',
                              amount: 6,
                            },
                          },
                        },
                        1000,
                      ],
                    },
                  },
                  {
                    $toInt: {
                      $divide: [
                        {
                          $toLong: {
                            $dateAdd: {
                              startDate: today,
                              unit: 'day',
                              amount: 1,
                            },
                          },
                        },
                        1000,
                      ],
                    },
                  },
                  86400,
                ],
              },
              as: 'date',
              in: {
                $dateToString: {
                  format: '%Y-%m-%d',
                  date: {
                    $toDate: {
                      $multiply: ['$$date', 1000],
                    },
                  },
                },
              },
            },
          },
        },
      },

      // Step 4: Iterate date array and existing data and assign any matches with their diff total or 0 if no match found
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

      // Step 6: Add fields for the new and diff totals
      {
        $addFields: {
          newTotal: {
            $arrayElemAt: [
              '$cumulatedTotals.totalsArray',
              {
                $subtract: [
                  {
                    $size: '$cumulatedTotals.totalsArray',
                  },
                  1,
                ],
              },
            ],
          },
        },
      },
      {
        $addFields: {
          diffTotal: {
            $round: [
              {
                $subtract: ['$newTotal.total', '$baseNetworth'],
              },
              2,
            ],
          },
        },
      },

      // Step 7: Simplify data and map date and total to results
      {
        $project: {
          diffTotal: '$diffTotal',
          diffPercentage: {
            $round: [
              {
                $multiply: [
                  {
                    $divide: ['$diffTotal', '$baseNetworth'],
                  },
                  100,
                ],
              },
              2,
            ],
          },
          results: {
            $map: {
              input: '$cumulatedTotals.totalsArray',
              as: 'result',
              in: {
                date: '$$result.date',
                total: { $round: ['$$result.total', 2] },
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
