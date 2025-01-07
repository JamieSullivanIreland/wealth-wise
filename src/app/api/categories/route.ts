import connectDB from '../../../../config/database';
import Asset from '../../../../models/Asset';

export const GET = async () => {
  try {
    await connectDB();

    const categories: IAsset[] = await Asset.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $count: {} },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    return new Response(JSON.stringify({ categories }), { status: 200 });
  } catch (error) {
    return new Response('Something went wrong', { status: 500 });
  }
};
