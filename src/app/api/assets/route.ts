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

    return new Response(JSON.stringify({ assets }), { status: 200 });
  } catch (error) {
    return new Response('Something went wrong', { status: 500 });
  }
};
