import { loginWithGoogle, signIn } from "@/lib/service";
import { compare } from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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

        const user = await signIn({
          email,
        });

        if (user) {
          const passwordConfirm = await compare(password, user.password);

          if (passwordConfirm) {
            return user;
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
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
      }

      if (account?.provider === "google") {
        const data = {
          fullname: user.name,
          email: user.email,
          type: "google",
        };

        await loginWithGoogle(data, (data) => {
          (token.email = data.email),
            (token.name = data.fullname),
            (token.phone = data.phone),
            (token.role = data.role);
        });
      }
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
