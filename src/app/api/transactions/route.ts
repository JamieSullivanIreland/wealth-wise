import { NextRequest } from 'next/server';
import connectDB from '../../../../config/database';
import Transaction from '../../../../models/Transaction';

export const GET = async (request: NextRequest) => {
  const limit = Number(request.nextUrl.searchParams.get('limit'));

  try {
    await connectDB();

    const transactions: ITransaction[] = await Transaction.find({})
      .sort({ _id: 1 })
      .limit(limit);

    return new Response(JSON.stringify({ transactions }), { status: 200 });
  } catch (error) {
    return new Response('Something went wrong', { status: 500 });
  }
};
