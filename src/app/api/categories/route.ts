import type { NextRequest } from 'next/server';
import type { PipelineStage } from 'mongoose';

import connectDB from '../../../../config/database';
import Asset from '../../../../models/Asset';
import { formatCategories } from '@/app/helpers/routeHelper';

export const GET = async (request: NextRequest) => {
  const filter: DateFilter = request.nextUrl.searchParams.get('filter');
  const today = new Date();
  let startDate: Date;

  // Determine the start date based on the filter
  switch (filter) {
    case 'week':
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 6);
      startDate.setUTCHours(0, 0, 0, 0);
      break;
    case 'month':
      startDate = new Date(today);
      startDate.setUTCDate(today.getUTCDate() - 28);
      break;
    case 'year':
      startDate = new Date(today);
      startDate.setFullYear(today.getFullYear() - 1);
      break;
    case 'all':
      startDate = new Date(2000, 0, 1);
      break;
    default:
      throw new Error(
        "Invalid filter type. Use 'week', 'month', 'year', or 'all'."
      );
  }

  try {
    await connectDB();

    const pipeline: PipelineStage[] =
      filter === 'all'
        ? [
            {
              $group: {
                _id: '$category',
                total: {
                  $sum: {
                    $subtract: ['$value', '$cost'],
                  },
                },
              },
            },
            ...formatCategories(),
          ]
        : [
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
                _id: '$category',
                total: {
                  $sum: {
                    $subtract: ['$value', '$cost'],
                  },
                },
              },
            },
            ...formatCategories(),
          ];

    const categories = await Asset.aggregate(pipeline).exec();

    return new Response(JSON.stringify({ categories }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
