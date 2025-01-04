import { NextRequest } from 'next/server';
import connectDB from '../../../../config/database';
import Asset from '../../../../models/Asset';

export const GET = async (request: NextRequest) => {
  const filter = request.nextUrl.searchParams.get('filter');
  const today = new Date();
  const date = new Date(today);
  let agg = 'dayOfWeek';
  let networth = [];

  // Need to get the total networth before this date
  // Return total plus the diff

  switch (filter) {
    case 'all':
      agg = 'year';
      date.setFullYear(date.getFullYear() - 100);
      break;
    case 'year':
      agg = 'month';
      date.setFullYear(date.getFullYear() - 1);
      break;
    case 'month':
      const month = date.getMonth();
      agg = 'week';
      date.setMonth(month - 1);
      while (date.getMonth() === month) {
        date.setDate(date.getDate() - 1);
      }
      break;
    case 'week':
      date.setDate(date.getDate() - 7);
      break;
    default:
      break;
  }

  try {
    await connectDB();

    networth = await Asset.aggregate([
      {
        $match: {
          createdAt: {
            $gt: date,
          },
        },
      },
      {
        $group: {
          _id: {
            [`$${agg}`]: '$createdAt',
          },
          timestamp: { $first: '$createdAt' },
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
