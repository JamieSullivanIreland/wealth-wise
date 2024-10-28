import { NextRequest } from 'next/server';
import connectDB from '../../../../../config/database';
import Transaction from '../../../../../models/Transaction';

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: number } }
) => {
  try {
    await connectDB();

    const transaction: ITransaction | null = await Transaction.findById(
      params.id
    );

    if (!transaction) {
      return new Response('Transaction not found', { status: 404 });
    }

    return new Response(JSON.stringify({ transaction }), { status: 200 });
  } catch (error) {
    return new Response('Something went wrong', { status: 500 });
  }
};
