namespace models {
  export interface IUser {
    id: string;
    email: string;
    username: string;
    createdAt: Date;
  }

  export interface IComment {
    id: string;
    content: string;
    createdAt: Date | string;
    userId: string;
    user: IUser;
  }
}
