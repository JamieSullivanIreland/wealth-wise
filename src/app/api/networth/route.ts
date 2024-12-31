import { NextRequest } from 'next/server';
import connectDB from '../../../../config/database';
import Asset from '../../../../models/Asset';

export const GET = async (request: NextRequest) => {
  let networth = [];

  try {
    await connectDB();

    networth = await Asset.aggregate([
      {
        $match: {
          createdAt: {
            $gt: new Date('2020-08-20'),
          },
        },
      },
      {
        $group: {
          _id: {
            $month: '$createdAt',
          },
          total: {
            $sum: {
              $subtract: ['$value', '$cost'],
            },
          },
          count: {
            $sum: 1,
          },
        },
      },
    ]).sort({ _id: 1 });

    return new Response(JSON.stringify({ networth }), { status: 200 });
  } catch (error) {
    return new Response('Something went wrong', { status: 500 });
  }
};
