import connectDB from '../../../../config/database';
import Transaction from '../../../../models/Transaction';

export const GET = async () => {
  try {
    await connectDB();

    const transactions: ITransaction[] = await Transaction.find({});

    return new Response(JSON.stringify({ transactions }), { status: 200 });
  } catch (error) {
    return new Response('Something wnet wrong', { status: 500 });
  }
};
