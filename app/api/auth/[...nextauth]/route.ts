import NextAuth from "next-auth";

const handler = NextAuth({
   providers: [],
   pages: {
     signIn: "/login",
   },
   session: {
     strategy: "jwt",
   },
   callbacks: {
     jwt: async ({ token, user }) => {
       if (user) {
         token.id = user.id;
       } else if (token.id === undefined && token.sub) {
         token.id = token.sub;
       }
       return token;
     },
     async session({ session, token }) {
       if (token) {
         session.user.id = token.id;
       }
       return session;
     },
   },
   secret: process.env.NEXTAUTH_SECRET || "YOUR_VERY_SECRET_KEY",
   url: process.env.NEXTAUTH_URL,
 });
 
 export { handler as GET, handler as POST };