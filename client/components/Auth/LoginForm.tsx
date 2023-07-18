'use client';
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

type FormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: 'http://localhost:3000/',
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl mb-4">Login</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email', { required: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.email && (
            <span className="text-red-500">Este campo é obrigatório</span>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Senha
          </label>
          <input
            type="password"
            id="password"
            {...register('password', { required: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.password && (
            <span className="text-red-500">Este campo é obrigatório</span>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-blue-600"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
