import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],

  pages: {
    signIn: "/login",  
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      // Called when user signs in (Google OAuth)
      // Save user to MongoDB
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
    },

    async jwt({ token, user }) {
      // Called when JWT is created or updated
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      // Called when session is checked
      session.user.id = token.id;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
