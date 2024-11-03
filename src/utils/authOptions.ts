import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import connectDB from '../../config/database';
import User from '../../models/User';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      if (!profile) {
        return '';
      }

      await connectDB();
      const userExists = await User.findOne({ email: profile.email });

      if (!userExists) {
        const username = profile?.name?.slice(0, 20);
        await User.create({
          email: profile.email,
          username,
          image: profile.image,
        });
      }

      return true;
    },
  },
};
