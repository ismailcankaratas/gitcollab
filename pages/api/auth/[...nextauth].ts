import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth, { AuthOptions, User } from "next-auth"
import { getAccessToken, getGithubUser } from "@/lib/auth";
import axios from "axios";

export const authOptions: AuthOptions = {
    session: { strategy: 'jwt' },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                Object.assign(token, user);
            }
            return token;
        },
        async session({ session, token }) {
            Object.assign(session.user as User, token);
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
                user.github_access_token = access_token;
                if (user) {
                    return user;
                }
                throw new Error('Invalid github account');
            }
        })
    ]
}

export default NextAuth(authOptions);