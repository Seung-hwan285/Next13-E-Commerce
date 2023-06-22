import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

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
    async jwt({ token, account }) {
      if (account?.provider === 'google') {
        console.log(account);
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
