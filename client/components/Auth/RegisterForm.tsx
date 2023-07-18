'use client';
import { useForm } from 'react-hook-form';
import axiosClient from '../../config/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const res = await axiosClient.post('/auth/register', data);
      if (res.status == 201) {
        toast.success('Conta criada com sucesso!');
        setTimeout(() => {
          router.push('/auth/signin');
        }, 2000);
      }
    } catch (error) {
      toast.error('Erro ao criar conta, tente novamente.');
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-64px)] border-2 border-red-500">
      <form className="w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl mb-4">Registro</h2>

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            Nome de usuário
          </label>
          <input
            type="text"
            id="username"
            {...register('username', { required: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.username && (
            <span className="text-red-500">Este campo é obrigatório</span>
          )}
        </div>

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
          Registrar
        </button>
      </form>
    </div>
  );
}
