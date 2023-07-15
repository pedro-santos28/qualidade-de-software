import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axiosClient from '../../../../../config/api';

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
        const user = res.data;

        if (res.status === 200 && user) {
          return user;
        }
        return null;
      },
    }),
  ],
  theme: {
    colorScheme: 'dark',
  },
  pages: {
    signIn: '/auth/signin',
  },
};
