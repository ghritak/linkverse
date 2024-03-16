import { useRouter } from 'next/router';
import React from 'react';

const UserProfile = ({ userData }) => {
  const router = useRouter();
  const { username } = router.query;

  return (
    <div>
      <h1>User Profile: {username}</h1>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { username } = params;
  const URL = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${URL}/api/link?username=${username}`);
  const userData = await res.json();

  return {
    props: {
      userData,
    },
  };
}

export default UserProfile;
