import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth, { AuthOptions } from "next-auth"
import { getAccessToken, getGithubUser } from "@/lib/auth";

export const authOptions: AuthOptions = {
    session: { strategy: 'jwt' },
    callbacks: {
        async jwt({ token, user }) {
          /* Step 1: update the token based on the user object */
          if (user) {
            Object.assign(token, user);
          }
          return token;
        },
        session({ session, token }) {
            Object.assign(session, token);
            return session;
        },
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                code: { type: "text" },
            },
            async authorize(credentials, req) {
                // (i.e., the request IP address)
                const code = credentials?.code as string;
                const access_token = await getAccessToken(code);
                const user = await getGithubUser(access_token);
                if (user) {
                    return user;
                }
                throw new Error('Invalid github account');
            }
        })
    ]
}

export default NextAuth(authOptions);