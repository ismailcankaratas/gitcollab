import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth, { AuthOptions, User } from "next-auth"
import { getAccessToken, getGithubUser } from "@/lib/auth";
import { db } from "@/lib/db";

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
                const code = credentials?.code as string;
                const access_token = await getAccessToken(code);
                const user = await getGithubUser(access_token);
                user.github_access_token = access_token;
                if (user) {
                    const dbUser = await db.get(`user:id:${user.id}`);
                    if(!dbUser) {
                        await db.set(`user:id:${user.id}`, user);
                        return user;
                    }
                    return dbUser;
                }
                throw new Error('Invalid github account');
            }
        })
    ]
}

export default NextAuth(authOptions);