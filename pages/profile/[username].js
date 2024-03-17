import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getUser } from '../../server-functions/profile/getUser';
import Image from 'next/image';

const page = () => {
  const router = useRouter();
  const { username } = router.query;
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const user = localStorage.getItem('USER');
    if (!user) {
      router.push('/login');
    } else {
      fetchUserData();
    }
  }, [username]);

  const fetchUserData = async () => {
    if (username) {
      try {
        const data = await getUser(username);
        console.log(data);
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleExternalLinkClick = (event, link) => {
    event.preventDefault();
    window.open(link, '_blank');
  };

  return (
    <div className='bg-gradient-to-tr from-gray-500 via-gray-700 to-black w-screen  h-screen flex justify-center overflow-hidden'>
      <div className='max-w-3xl md:min-w-[700px] bg-gradient-to-tr from-gray-500 via-gray-700 to-black overflow-y-scroll px-20'>
        <div className='w-full flex justify-center mt-10'>
          {userData && userData?.profile_photo ? (
            <Image
              src={item.logo}
              alt='Link logo'
              width={10}
              height={10}
              className='w-10 h-10'
            />
          ) : (
            <div className='w-40 h-40 bg-gray-300 rounded-full animate-pulse'></div>
          )}
        </div>

        <div className='w-full flex-col justify-center items-center mt-10 text-white'>
          <p className='text-center text-lg mt-4'>@{userData?.username}</p>
          <h1 className='text-center text-3xl font-semibold'>
            {userData?.name}
          </h1>
          <p className='text-center text-lg mt-4'>{userData?.bio}</p>
        </div>
        <div className='mt-20'>
          {userData &&
            userData.links.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={(e) => handleExternalLinkClick(e, item.link)}
                  className='flex justify-between items-center my-6 w-full flex-1 border-[1px] p-2 rounded-lg cursor-pointer text-white hover:scale-[103%] transition-all duration-300'
                >
                  {item.logo ? (
                    <Image
                      src={item.logo}
                      alt='Link logo'
                      width={10}
                      height={10}
                      className='w-10 h-10'
                    />
                  ) : (
                    <div className='w-10 h-10 bg-gray-300 animate-pulse rounded-lg'></div>
                  )}
                  <div className='min-w-[200px]'>
                    <h1 className='text-center'>{item?.name}</h1>
                  </div>
                  <div className='w-7 h-7 flex items-center justify-center rounded-full bg-gray-400 hover:scale-110'>
                    •••
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default page;
