import type { NextRequest } from 'next/server';
import type { PipelineStage } from 'mongoose';

import connectDB from '../../../../config/database';
import Transaction from '../../../../models/Transaction';

export const GET = async (request: NextRequest) => {
  try {
    await connectDB();

    // Extract query parameters
    const limit = Number(request.nextUrl.searchParams.get('limit')) || 5;
    const sortBy = request.nextUrl.searchParams.get('sortBy') || 'createdAt';
    const order = request.nextUrl.searchParams.get('order') === 'asc' ? 1 : -1;
    const page = Number(request.nextUrl.searchParams.get('page')) || 1;

    // Get total count of documents
    const totalCount = await Transaction.countDocuments();
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
      {
        $addFields: {
          asset_id: { $toObjectId: '$asset_id' },
        },
      },
      {
        $lookup: {
          from: 'assets',
          localField: 'asset_id',
          foreignField: '_id',
          as: 'asset',
        },
      },
      {
        $unwind: '$asset',
      },
      {
        $project: {
          _id: 1,
          date: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$updatedAt',
            },
          },
          amount: 1,
          'asset._id': 1,
          'asset.name': 1,
          'asset.category': 1,
        },
      },
      {
        $sort: {
          ...(sortBy === 'assetName' ? { 'asset.name': order } : {}),
          ...(sortBy === 'assetCategory' ? { 'asset.category': order } : {}),
          ...(sortBy !== 'assetName' && sortBy !== 'assetCategory'
            ? { [sortBy]: order }
            : {}),
          _id: order,
        },
      },
      { $skip: skip },
      { $limit: limit },
    ];

    const transactions = await Transaction.aggregate(pipeline).exec();

    return new Response(
      JSON.stringify({
        totalCount,
        totalPages,
        currentPage: page,
        transactions,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response('Something went wrong', { status: 500 });
  }
};
