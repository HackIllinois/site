import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: { token: { label: "Token", type: "text" } },
            authorize: async credentials => {
                const token = credentials.token as string;

                if (!token) {
                    return null;
                }

                return { name: token };
            }
        })
    ],
    pages: {
        signIn: "/login"
    }
});
