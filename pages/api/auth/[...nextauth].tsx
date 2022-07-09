import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  getGoogleRefreshToken,
  GOOGLE_AUTHORIZATION_URL,
} from "../../../services/google/auth";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials: any, req) {
        const response = await fetch("http://localhost:3000/api/auth/login", {
          body: JSON.stringify(credentials),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const user = await response.json();
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: GOOGLE_AUTHORIZATION_URL,
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        const today = new Date();

        return {
          accessToken:
            account.provider === "credentials"
              ? user.access_token
              : account.access_token,
          accessTokenExpires: today.setHours(today.getHours() + 1),
          refreshToken:
            account.provider === "credentials"
              ? user.refresh_token
              : account.refresh_token,
          user: account.provider === "credentials" ? user.user : user,
          provider: account.provider,
        };
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      if (token.provider === "google") {
        return getGoogleRefreshToken(token);
      } else {
        return token;
      }
    },
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.provider = token?.provider;

      return session;
    },
  },
});
