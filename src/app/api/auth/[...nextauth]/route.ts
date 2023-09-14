import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: unknown = {
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

    async jwt({ token }) {
      // window.localStorage.setItem('token', JSON.stringify(token));
      return token;
    },
  },
};

const handler = NextAuth(<AuthOptions>authOptions);

export { handler as GET, handler as POST };
