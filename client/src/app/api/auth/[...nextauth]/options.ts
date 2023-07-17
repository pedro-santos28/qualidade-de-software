/* eslint-disable react-hooks/rules-of-hooks */
import type { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axiosClient from '../../../../../config/api';
import { useUserContext } from '../../../../../contexts/context';


export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'Digite seu email',
        },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials, req) {
        const body = JSON.stringify(credentials);
        const res = await axiosClient.post('auth/login', body);
        const data = res.data;

        if (res.status === 200 && data.userResponseDTO) {
          return data.userResponseDTO as User;
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update') {
        return { ...token, ...session.user };
      }

      if (user) {
        token.user = user;
      }
      return token;
    },

    async session({ session, token }) {
      const { user } = token;
      if (user) {
        session.user = {
          id: user.id,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt,
        };
      }

      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  theme: {
    colorScheme: 'dark',
  },
  pages: {
    signIn: '/auth/signin',
  },
};
