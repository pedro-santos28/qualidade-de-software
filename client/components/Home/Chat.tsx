'use client';
import { useForm } from 'react-hook-form';
import axiosClient from '../../config/api';
import { useUserContext } from '../../contexts/context';
import { fetcher } from '../../config/api';
import useSWR from 'swr';
import EditComment from './EditComment';
import Comment from './Comment';

type ChatProps = {
  comments: models.IComment[];
};

type FormData = {
  comment: string;
};

export default function Chat() {
  const { session } = useUserContext();

  const { data: comments, mutate } = useSWR('/comments', fetcher);
  // const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const body = { content: data.comment, userId: session?.user?.id };

    try {
      const res = await axiosClient.post('/comments', body);
      console.log(res.status);
      if (res.status === 201) {
        mutate();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col h-screen border-2 border-black">
      <div className="flex-grow flex flex-col bg-gray-100 px-4 py-6">
        <div className="flex-grow overflow-y-auto">
          {comments?.map((comment: models.IComment) => (
            <Comment key={comment.id} comment={comment} mutate={mutate} />
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
            disabled={!session?.user}
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
