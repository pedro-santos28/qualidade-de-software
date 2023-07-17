'use client';
import { useForm } from 'react-hook-form';
import axiosClient from '../../config/api';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Session } from 'next-auth';
import { useUserContext } from '../../contexts/context';

type ChatProps = {
  comments: models.IComment[];
};

type FormData = {
  comment: string;
};

export default function Chat({ comments }: ChatProps) {
  const { user, getCurrentSession, session } = useUserContext();

  useEffect(() => {
    getCurrentSession();
  }, []);

  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const body = { content: data.comment, userId: session?.user?.id };
    const res = await axiosClient.post('/comments', body);
  };

  const handleDeleteComment = async (commentId: string) => {
    const res = await axiosClient.delete(`/comments/${commentId}`);
    console.log(res);
  };

  return (
    <div className="flex flex-col h-screen border-2 border-black">
      <div className="flex-grow flex flex-col bg-gray-100 px-4 py-6">
        <div className="flex-grow overflow-y-auto">
          {comments.map((comment: models.IComment) => (
            <div
              key={comment.id}
              className="bg-white p-4 mb-4 shadow rounded-lg"
            >
              <div className="flex justify-between items-center mb-2">
                <p>{comment.content} </p>
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                >
                  Excluir
                </button>
              </div>
              <div className="text-gray-500 text-xs">
                Enviado em: {comment.createdAt.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
        <form className="flex mt-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register('comment')}
            className="flex-grow rounded-l-lg border border-gray-300 focus:outline-none focus:border-blue-500 px-3 py-2"
            placeholder="Digite sua mensagem..."
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-blue-600 text-white rounded-r-lg px-4 py-2"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
