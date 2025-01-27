import { NextRequest } from 'next/server';
import connectDB from '../../../../config/database';
import Asset from '../../../../models/Asset';

export const GET = async (request: NextRequest) => {
  const limit = Number(request.nextUrl.searchParams.get('limit'));
  let assets: IAsset[] = [];

  try {
    await connectDB();

    if (limit === 0) {
      assets = await Asset.find({}).sort({ _id: 1 });
    } else {
      assets = await Asset.find({}).sort({ _id: 1 }).limit(limit);
    }

    // To group assets by category
    // const assets: IAsset[] = await Asset.aggregate([
    //   {
    //     $group: {
    //       _id: '$category',
    //       results: {
    //         $push: {
    //           name: '$name',
    //           cost: '$cost',
    //           detail: '$detail',
    //           numShares: '$v',
    //           createdAt: '$createdAt',
    //         },
    //       },
    //     },
    //   },
    //   {
    //     $sort: {
    //       _id: 1,
    //     },
    //   },
    //   {
    //     $project: {
    //       _id: 0,
    //       name: '$_id',
    //       results: '$results',
    //     },
    //   },
    // ]);

    return new Response(JSON.stringify({ assets }), { status: 200 });
  } catch (error) {
    return new Response('Something went wrong', { status: 500 });
  }
};
