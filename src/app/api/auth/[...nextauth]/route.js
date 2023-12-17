import { signIn } from "@/lib/service";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const { email, password } = credentials;

        // console.log({ email, password });

        const user = await signIn({
          email,
        });

        if (user && user.password === password) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account, profile, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account?.provider === "credentials") {
        (token.email = user.email),
          (token.name = user.fullname),
          (token.phone = user.phone),
          (token.role = user.role);
        console.log(token);
      }
      console.log(token);
      return token;
    },

    async session({ session, token, user }) {
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("name" in token) {
        session.user.name = token.name;
      }
      if ("phone" in token) {
        session.user.phone = token.phone;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
