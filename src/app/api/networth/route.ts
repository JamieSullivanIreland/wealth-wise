import { NextRequest } from 'next/server';
import connectDB from '../../../../config/database';
import Asset from '../../../../models/Asset';

export const GET = async (request: NextRequest) => {
  const filter = request.nextUrl.searchParams.get('filter');
  const today = new Date();
  const date = new Date(today);
  let agg = 'dayOfWeek';
  let networth = [];

  switch (filter) {
    case 'all':
      agg = 'year';
      date.setFullYear(date.getFullYear() - 100);
      break;
    case 'year':
      agg = 'month';
      date.setFullYear(date.getFullYear() - 1);
      break;
    case 'month':
      const month = date.getMonth();
      agg = 'week';
      date.setMonth(month - 1);
      while (date.getMonth() === month) {
        date.setDate(date.getDate() - 1);
      }
      break;
    case 'week':
      date.setDate(date.getDate() - 7);
      break;
    default:
      break;
  }

  try {
    await connectDB();

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
                  // $push: '$timestamp',
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
                  $arrayElemAt: ['$results.cumulatedValues.values', '$$index'],
                },
              },
            },
          },
        },
      },
    ]);

    return new Response(JSON.stringify({ networth: networth[0] }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
