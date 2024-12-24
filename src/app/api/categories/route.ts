import connectDB from '../../../../config/database';
import Category from '../../../../models/Category';

export const GET = async () => {
  try {
    await connectDB();

    const categories: ICategory[] = await Category.find({});

    return new Response(JSON.stringify({ categories }), { status: 200 });
  } catch (error) {
    return new Response('Something went wrong', { status: 500 });
  }
};
