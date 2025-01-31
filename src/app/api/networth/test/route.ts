import { NextRequest } from 'next/server';

import Asset from '@/models/Asset';

type DateFilter = 'week' | 'month' | 'year' | 'all';

export const GET = async (request: NextRequest) => {
  const filter: DateFilter = request.nextUrl.searchParams.get('filter');
  const today = new Date();
  let startDate: Date;
  let networth = [];
  let agg = 'dayOfWeek';

  // Determine the start date based on the filter
  switch (filter) {
    case 'week':
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 7);
      break;
    case 'month':
      agg = 'week';
      startDate = new Date(today);
      startDate.setMonth(today.getMonth() - 1);
      break;
    case 'year':
      agg = 'month';
      startDate = new Date(today);
      startDate.setFullYear(today.getFullYear() - 1);
      break;
    case 'all':
      // TODO change to first date of the collection
      agg = 'year';
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
                  $lt: startDate,
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
                  $gt: startDate,
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
                  $push: '$timestamp',
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
      // {
      //   $project: {
      //     _id: 0,
      //     prevTotal: '$prevTotalNetworth.value',
      //     cumulatedValues: '$results.cumulatedValues',
      //     results: {
      //       $map: {
      //         input: { $range: [0, { $size: '$results.dates' }] },
      //         as: 'index',
      //         in: {
      //           timestamp: { $arrayElemAt: ['$results.dates', '$$index'] },
      //           total: {
      //             $arrayElemAt: ['$results.cumulatedValues.values', '$$index'],
      //           },
      //         },
      //       },
      //     },
      //   },
      // },
    ]);

    return new Response(JSON.stringify({ networth }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
