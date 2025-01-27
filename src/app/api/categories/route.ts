import connectDB from '../../../../config/database';
import Asset from '../../../../models/Asset';

export const GET = async () => {
  try {
    await connectDB();

    const categories: IAsset[] = await Asset.aggregate([
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
      {
        $sort: {
          _id: 1,
        },
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          total: '$total',
        },
      },
    ]);

    return new Response(JSON.stringify({ categories }), { status: 200 });
  } catch (error) {
    return new Response('Something went wrong', { status: 500 });
  }
};
