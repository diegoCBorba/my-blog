import React from 'react';

interface Props {
  params: { userId: string };
}

const UserPage = ({ params }: Props) => {
  const { userId } = params;

  return (
    <div>{userId}</div>
  );
};

export default UserPage;
