import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
let users;

async function connectDB() {
  if (!users) {
    await client.connect();
    users = client.db("ridezone").collection("users");
  }
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "Login",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        await connectDB();

        const user = await users.findOne({ email: credentials.email });
        if (!user) throw new Error("No user found");

        const match = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!match) throw new Error("Invalid password");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image || null,   // ⭐ IMPORTANT
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user, account, profile }) {
      // First time login
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image ?? profile?.picture ?? null; 
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.image;  
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
