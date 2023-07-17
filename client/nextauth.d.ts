export enum Role {
  user = 'user',
  admin = 'admin',
}

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    username: string;
    createdAt: Date;
    role: string;
  }

  interface Session {
    user?: models.IUser;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user?: User;
    subscribed: boolean;
  }
}
