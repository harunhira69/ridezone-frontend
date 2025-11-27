import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";



const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("❌ MONGODB_URI is missing in Vercel Environment Variables");
}

let client = global._mongoClient || new MongoClient(uri);
global._mongoClient = client;

async function getUsersCollection() {
  if (!client.topology || !client.topology.isConnected?.()) {
    await client.connect();
  }
  return client.db("ridezone").collection("users");
}



export const authOptions = {
  providers: [
    // GOOGLE LOGIN
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // EMAIL + PASSWORD LOGIN
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials.email || !credentials.password) return null;

        const users = await getUsersCollection();
        const email = credentials.email.toLowerCase();

        const user = await users.findOne({ email });

        if (!user) return null; 
        if (!user.password) return null; 

        const isCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isCorrect) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image || null,
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    // ------------
    // SIGN-IN LOGIC
    // ------------
    async signIn({ user, account }) {
      try {
        const users = await getUsersCollection();

        if (account.provider === "google") {
          const email = user.email.toLowerCase();

          const existingUser = await users.findOne({ email });

          // Create user if not exists
          if (!existingUser) {
            await users.insertOne({
              name: user.name,
              email,
              image: user.image || null,
              password: null,
              createdAt: new Date(),
            });
          }
        }

        return true; 
      } catch (err) {
        console.error("Google Sign-In Error:", err);
        return true; 
      }
    },

    // ------------
    // JWT TOKEN
    // ------------
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image || null;
      }
      return token;
    },

    // ------------

    // ------------
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.image;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};



const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
