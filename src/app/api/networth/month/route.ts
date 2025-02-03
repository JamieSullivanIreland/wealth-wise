import { generateCumulatedNetworth } from '@/app/helpers/networth';
import Asset from '@/models/Asset';

export const GET = async () => {
  const today = new Date();
  const fourWeeksAgo = new Date(today);
  fourWeeksAgo.setUTCDate(fourWeeksAgo.getUTCDate() - 28);

  try {
    const pipeline = [
      // Step 1: Filter documents for the base total before sta rt date and all totals after start date
      {
        $facet: {
          baseNetworth: [
            {
              $match: {
                createdAt: { $lt: fourWeeksAgo },
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
                  $gte: fourWeeksAgo,
                  $lte: today,
                },
              },
            },
            {
              $group: {
                _id: {
                  $week: '$createdAt',
                },
                date: {
                  $last: '$createdAt',
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
              $sort: {
                date: 1,
              },
            },
            {
              $project: {
                date: {
                  $dateToString: {
                    format: '%Y-%m-%d',
                    date: {
                      $dateTrunc: {
                        date: '$date',
                        unit: 'week',
                        binSize: 1,
                        startOfWeek: 'Sun',
                      },
                    },
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
            $reverseArray: {
              $map: {
                input: {
                  $range: [
                    0, // Start at 0 (current week)
                    5, // Generate 5 weeks
                    1, // Step: 1 week per iteration
                  ],
                },
                as: 'weekOffset',
                in: {
                  $dateToString: {
                    format: '%Y-%m-%d',
                    date: {
                      $dateSubtract: {
                        startDate: {
                          $dateTrunc: { date: today, unit: 'week' },
                        },
                        unit: 'week',
                        amount: '$$weekOffset',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      ...generateCumulatedNetworth('dateArray', 'existingData', 'baseNetworth'),
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
