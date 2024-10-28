import connectDB from '../../config/database';

export const getTransactions = async (limit: number = 6) => {
  await connectDB();
  const data = await fetch(
    `http://localhost:3000/api/transactions?limit=${limit}`
  ).then((res) => res.json());
  return data.transactions;
};
