import Chat from '../../components/Home/Chat';
import axiosClient from '../../config/api';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';

async function getComments() {
  const res = await axiosClient.get('/comments');
  const comments = res.data;
  return comments;
}

export default async function Home() {
  const comments = await getComments();

  // const session = await getServerSession(options);

  return (
    <main>
      <Chat comments={comments}></Chat>
    </main>
  );
}
