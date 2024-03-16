import { useRouter } from 'next/router';
import React from 'react';

const page = () => {
  const router = useRouter();
  const { username } = router.query;
  return (
    <div>
      <h1>User Profile: {username}</h1>
    </div>
  );
};

export default page;
