import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Replace with your backend login logic
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

        const res = await fetch(`${backendUrl}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const user = await res.json();

        if (res.ok && user) {
          return user; // must return user object
        } else {
          return null; // login failed
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        // Google OAuth: save user to your DB
        try {
          const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
          const response = await fetch(`${backendUrl}/auth/google-signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: user.name || profile?.name,
              email: user.email,
              image: user.image || profile?.picture,
              googleId: profile?.sub,
            }),
          });

          if (!response.ok) {
            console.error("Failed to save user to database");
            return false;
          }

          return true;
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }

      return true; // allow credentials login
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
