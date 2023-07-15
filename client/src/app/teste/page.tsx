import React from 'react';
import { options } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

type Props = {};

const page = async (props: Props) => {
  const session = await getServerSession(options);

  if (!session) {
    redirect('/?callbackUrl=/teste');
  }

  return <div>teste</div>;
};

export default page;
