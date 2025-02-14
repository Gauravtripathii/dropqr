import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";

const authOptions = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
    ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };