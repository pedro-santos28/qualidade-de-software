"use client";
import { Session } from "next-auth";
import {
  useContext,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import axiosClient from "../config/api";
import { getSession } from "next-auth/react";

interface IUserContext {
  user: models.IUser | undefined;
  setUser: (user: models.IUser) => void;
  onlineUsers: models.IUser[] | undefined;
  setOnlineUsers: (users: models.IUser[]) => void;
  session: Session | null;
  setSession: Dispatch<SetStateAction<Session | null>>;
  getOnlineUsers: () => void;
  getCurrentSession: () => void;
}

const initialUserContext: IUserContext = {
  user: undefined,
  setUser: () => {},
  onlineUsers: undefined,
  setOnlineUsers: () => {},
  session: null,
  setSession: () => {},
  getOnlineUsers: () => {},
  getCurrentSession: () => {},
};

export const UserContext = createContext<IUserContext>(initialUserContext);

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<models.IUser | undefined>();
  const [onlineUsers, setOnlineUsers] = useState<models.IUser[] | undefined>();
  const [session, setSession] = useState<Session | null>(null);

  async function getOnlineUsers() {
    const res = await axiosClient.get("/users/getOnlineUsers");
    const onlineUsers = res.data;
    setOnlineUsers(onlineUsers);
  }

  async function getCurrentSession() {
    const session = await getSession();
    return session;
  }

  useEffect(() => {
    const fetchCurrentSession = async () => {
      const currentSession = await getCurrentSession();
      setSession(currentSession || null);
    };

    fetchCurrentSession();
  }, []);

  console.log(session);

  const contextValue: IUserContext = {
    user,
    setUser,
    onlineUsers,
    setOnlineUsers,
    session,
    setSession,
    getOnlineUsers,
    getCurrentSession,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
