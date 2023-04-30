import NextAuth, { NextAuthOptions } from "next-auth";
import Providers from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";

const API_BASE_URL = "/api/users";

type Credential = {
    email: string,
    password: string
}

type Token = {
    token: string
}

type User = {
    email: string,
    password: string
}

const options: NextAuthOptions = {
    providers: [
        Credentials({
            name: "Email and Password",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any) {
                try {
                    const response = await axios.post(`${API_BASE_URL}/login`, {
                        email: credentials.email,
                        password: credentials.password,
                    });
                    if (response.status === 200) {
                        const user = response.data;
                        // You can add custom logic here to check if the user is allowed to sign in
                        return user;
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.log(error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            session.user = token;
            return session;
        },
    },
    pages: {
        signIn: "/auth/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
};

export default (req: any, res: any) => NextAuth(req, res, options);
