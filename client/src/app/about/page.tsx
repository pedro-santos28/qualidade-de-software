import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';

type Props = {};

const page = async ({ session }: any) => {
  return <div>page</div>;
};

export default page;

export async function GetServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, options);

  console.log(session);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
