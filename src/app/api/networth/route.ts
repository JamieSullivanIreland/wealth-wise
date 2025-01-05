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

    // Original
    // networth = await Asset.aggregate([
    //   {
    //     $match: {
    //       createdAt: {
    //         $gt: date,
    //       },
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: {
    //         [`$${agg}`]: '$createdAt',
    //       },
    //       timestamp: { $first: '$createdAt' },
    //       total: {
    //         $sum: {
    //           $subtract: ['$value', '$cost'],
    //         },
    //       },
    //       count: {
    //         $sum: 1,
    //       },
    //     },
    //   },
    // ]).sort({ _id: 1 });

    // Working
    networth = await Asset.aggregate([
      // Group results by year and get total networth for each year
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
      // Group and give each year a date and total
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
      // Add the result for the cumulated value of each year
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
      // Tidy up results
      {
        $project: {
          _id: 0,
          results: {
            $map: {
              input: { $range: [0, { $size: '$dates' }] },
              as: 'index',
              in: {
                timestamp: { $arrayElemAt: ['$dates', '$$index'] },
                value: { $arrayElemAt: ['$cumulatedValues.values', '$$index'] },
              },
            },
          },
        },
      },
    ]);

    // This is for all filters except 'All'
    // networth = await Asset.aggregate([
    //   {
    //     $facet: {
    //       totalNetworth: [
    //         {
    //           $match: {
    //             createdAt: {
    //               $gt: date,
    //             },
    //           },
    //         },
    //         {
    //           $group: {
    //             _id: null,
    //             value: {
    //               $sum: {
    //                 $subtract: ['$value', '$cost'],
    //               },
    //             },
    //           },
    //         },
    //       ],
    //       results: [
    //         {
    //           $match: {
    //             createdAt: {
    //               $gt: date,
    //             },
    //           },
    //         },
    //         {
    //           $group: {
    //             _id: {
    //               [`$${agg}`]: '$createdAt',
    //             },
    //             timestamp: { $first: '$createdAt' },
    //             total: {
    //               $sum: {
    //                 $subtract: ['$value', '$cost'],
    //               },
    //             },
    //             count: {
    //               $sum: 1,
    //             },
    //           },
    //         },
    //       ],
    //     },
    //   },
    //   { $unwind: '$totalNetworth' },
    //   {
    //     $project: {
    //       _id: 0,
    //       total: '$totalNetworth.value',
    //       results: '$results',
    //     },
    //   },
    // ]);

    return new Response(JSON.stringify({ networth }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
