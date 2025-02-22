import type { NextRequest } from 'next/server';
import type { PipelineStage } from 'mongoose';

import connectDB from '../../../../config/database';
import Asset from '../../../../models/Asset';

export const GET = async (request: NextRequest) => {
  const limit = Number(request.nextUrl.searchParams.get('limit'));
  const sortBy = request.nextUrl.searchParams.get('sortBy') as string;
  const order = request.nextUrl.searchParams.get('order') === 'asc' ? 1 : -1;

  try {
    await connectDB();

    const pipeline: PipelineStage[] = [
      {
        $limit: limit,
      },
      { $sort: { [sortBy]: order as 1 | -1 } },
      {
        $project: {
          _id: 0,
          date: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$updatedAt',
            },
          },
          name: '$name',
          category: '$category',
          numShares: '$numShares',
          value: '$value',
          cost: '$cost',
        },
      },
    ];

    const data = await Asset.aggregate(pipeline).exec();

    return new Response(JSON.stringify({ assets: data }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
