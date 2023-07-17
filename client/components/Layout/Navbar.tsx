"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Typography } from "antd";
import { signOut, useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import axiosClient from "../../config/api";
import { useUserContext } from "../../contexts/context";
const { Title, Paragraph, Text } = Typography;

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: sessionData, status, update } = useSession();
  const { getOnlineUsers, onlineUsers, getCurrentSession, session } =
    useUserContext();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    getOnlineUsers();
    getCurrentSession();
  }, []);

  const handleLogOut = async () => {
    const payload = {
      email: session?.user?.email,
    };
    const res = await axiosClient.post("/auth/logout", payload);
    console.log(res);
    if (res.status === 200) signOut();
  };

  const handleChangeUser = async () => {
    await update({
      ...session,
      user: {
        ...session?.user,
        username: "editado",
      },
    });
  };

  return (
    <nav className="flex items-center justify-between py-4 px-8 bg-gray-800 text-white">
      <div className="text-2xl font-bold">
        <Link href="/">Chat Social</Link>
      </div>

      {session ? <h2>Bem vindo, {session.user?.username}</h2> : null}

      <div className="space-x-4">
        <div className="inline-block">
          <Link href="/">
            <span className="text-white hover:text-gray-300">Inicio</span>
          </Link>
        </div>

        <div className="inline-block relative">
          <span
            className="text-white hover:text-gray-300 cursor-pointer"
            onClick={toggleDropdown}
          >
            Usuários
          </span>
          {isDropdownOpen && (
            <div className="absolute left-0 mt-2 w-40 bg-white text-gray-700 rounded shadow-lg py-2">
              {onlineUsers?.map((user) => (
                <div className="px-4" key={user.id} onClick={handleChangeUser}>
                  <div className="font-bold">{user?.username}</div>
                  {/* <div className="ml-4">
                    <div>Enviar mensagem</div>
                    <div>Editar mensagem</div>
                    <div>Excluir mensagem</div>
                    <div>alterar usuário</div>
                  </div> */}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="inline-block">
          <Link href="/auth/signup">
            <span className="text-white hover:text-gray-300">Registrar</span>
          </Link>
        </div>

        <div className="inline-block">
          <Link href="/auth/signin">
            <span className="text-white hover:text-gray-300">Entrar</span>
          </Link>
        </div>

        {session && (
          <div className="inline-block">
            <span
              className="text-white hover:text-gray-300 cursor-pointer"
              onClick={handleLogOut}
            >
              Sair
            </span>
          </div>
        )}
      </div>
    </nav>
  );
}
