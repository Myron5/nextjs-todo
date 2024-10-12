import NextAuth, { Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";

import UserService from "@/lib/services/backend/user";
import { userSchema } from "@/lib/schemas/backend/userSchema";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          required: true,
        },
        password: {
          label: "Password",
          type: "password",
          required: true,
        },
      },
      async authorize(credentials) {
        const schemaValidationResult = userSchema.validate(credentials);
        if (!credentials || schemaValidationResult.error) {
          // 400
          throw new Error(
            schemaValidationResult?.error?.details?.[0]?.message ||
              "Invalid data"
          );
        }

        const { email, password } = credentials;
        const user = await UserService.verify({ email, password });
        if (!user) {
          // 401
          throw new Error("Unauthorized");
        }
        if (user.verifToken !== "") {
          // 403
          throw new Error("Please verify your email");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    async encode({ secret, token }) {
      if (!token) {
        throw new Error("No token to encode");
      }
      return jwt.sign(token, secret);
    },
    async decode({ secret, token }) {
      if (!token) {
        throw new Error("No token to decode");
      }
      const decodedToken = jwt.verify(token, secret);
      if (typeof decodedToken === "string") {
        return JSON.parse(decodedToken);
      } else {
        return decodedToken;
      }
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    async session(params: {
      session: Session;
      // user: User;
      token: JWT;
    }) {
      if (params.session.user) {
        params.session.user.id = params.token.id as string;
        params.session.user.email = params.token.email as string;
      }
      return params.session;
    },
    async jwt(params: {
      token: JWT;
      user?: User | undefined;
      // account?: Account | null | undefined;
      // profile?: Profile | undefined;
      // isNewUser?: boolean | undefined;
    }) {
      if (params.user) {
        params.token.id = params.user.id;
        params.token.email = params.user.email;
      }
      return params.token;
    },
  },
});
