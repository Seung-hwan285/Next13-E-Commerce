import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { isJwt } from '@/utils/isJwt';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      secret: process.env.NEXT_PUBLIC_SECRET,
      clientId: process.env.NEXT_PUBLIC_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_SECRET as string,
    }),
  ],

  callbacks: {
    async jwt({ token, account, profile }) {
      isJwt(token);
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
