import React from 'react';
import LoginForm from '../../../../components/Login/LoginForm';

type Props = {};

const page = (props: Props) => {
  return (
    <div className="h-[100vh] flex items-center justify-center border-2">
      <LoginForm />
    </div>
  );
};

export default page;
