import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Kullanıcı Adı", type: "text", placeholder: "Kullanıcı adınızı girin" },
                password: { label: "Şifre", type: "password", placeholder: "Şifrenizi girin" }
            },
            async authorize(credentials) {
                // credentials tanımlı mı kontrol et
                if (!credentials || !credentials.username || !credentials.password) {
                    throw new Error("Kullanıcı adı ve şifre gereklidir");
                }
            
                // Kullanıcı adı ve şifreyi kontrol et
                if (credentials.username === "alper@gmail.com" && credentials.password === "12345678") {
                    return { id: 1, name: "alper@gmail.com" }; // Kullanıcıyı döndür
                } else {
                    throw new Error("Kullanıcı adı veya şifre yanlış"); // Hata mesajı
                }
            }
            
        }),
    ],
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = session.user || { id: null }; // Varsayılan değer
            session.user.id = token.id;
            return session;
        },
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
