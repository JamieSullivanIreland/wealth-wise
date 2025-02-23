import type { NextRequest } from 'next/server';
import type { PipelineStage } from 'mongoose';

import connectDB from '@/config/database';
import Asset from '@/models/Asset';

export const GET = async (request: NextRequest) => {
  try {
    await connectDB();

    // Extract query parameters
    const limit = Number(request.nextUrl.searchParams.get('limit')) || 5;
    const sortBy = request.nextUrl.searchParams.get('sortBy') || 'createdAt';
    const order = request.nextUrl.searchParams.get('order') === 'asc' ? 1 : -1;
    const page = Number(request.nextUrl.searchParams.get('page')) || 1;

    // Get total count of documents
    const totalCount = await Asset.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);

    // Ensure the page is within valid range
    if (page < 1 || page > totalPages) {
      return new Response(JSON.stringify({ error: 'Invalid page number' }), {
        status: 400,
      });
    }

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    const pipeline: PipelineStage[] = [
      { $sort: { [sortBy]: order, _id: order } },
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          _id: 1,
          date: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$updatedAt',
            },
          },
          name: 1,
          category: 1,
          numShares: 1,
          value: 1,
          cost: 1,
        },
      },
    ];

    const assets = await Asset.aggregate(pipeline).exec();

    return new Response(
      JSON.stringify({
        totalCount,
        totalPages,
        currentPage: page,
        assets,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
