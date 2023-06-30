import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { isJwt } from '@/lib/utils/isJwt';
import { Provider } from 'react';

export const authOptions: any = {
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
    async session({ token, session }) {
      if (token) {
        // set session here
      }
      return session;
    },

    async jwt({ token, account, profile }) {
      // window.localStorage.setItem('token', JSON.stringify(token));
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
