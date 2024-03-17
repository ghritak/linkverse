import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { getUser } from '../../server-functions/profile/getUser';
import Image from 'next/image';
import { IoShareOutline } from 'react-icons/io5';
import { FiEdit, FiLogOut } from 'react-icons/fi';
import { BsThreeDotsVertical } from 'react-icons/bs';

const page = () => {
  const router = useRouter();
  const { username } = router.query;
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);
  const [isEditMode, setEditMode] = useState(false);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      event.target.id !== 'menuButton'
    ) {
      setMenuVisible(false);
    }
  };

  const handleButtonClick = (event) => {
    setMenuVisible(!menuVisible);
  };

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

  const handleClickDot = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // alert('he');
  };

  const handleEditProfile = () => {
    setMenuVisible(false);
    setEditMode(true);
  };

  const handleLogout = () => {
    setMenuVisible(false);
  };

  return (
    <div className='bg-gradient-to-tr from-gray-500 via-gray-700 to-black w-screen  h-screen flex justify-center overflow-hidden'>
      {!loading ? (
        <div className='relative max-w-3xl  md:min-w-[700px] md:bg-gradient-to-tr from-gray-500 via-gray-700 to-black overflow-y-scroll px-10 sm:px-20'>
          <button
            onClick={handleButtonClick}
            aria-expanded={menuVisible}
            aria-haspopup='true'
            id='menuButton'
            className='absolute top-6 right-6 cursor-pointer hover:scale-95 hover:bg-white hover:text-black flex items-center justify-center text-white rounded-full p-2 transition-all duration-300'
          >
            <span id='menuButton'>
              <BsThreeDotsVertical id='menuButton' />
            </span>
          </button>
          <div
            ref={menuRef}
            className={`absolute top-16 right-10 text-black transition-opacity duration-200 bg-white rounded-md ${
              menuVisible ? '' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div
              onClick={handleEditProfile}
              className='flex items-center p-2.5 w-28 border-b-[1px] cursor-pointer hover:bg-gray-200 rounded-t-md transition-all duration-300 justify-between'
            >
              <p className='mr-2'>Edit </p>
              <FiEdit />
            </div>
            <div
              onClick={handleLogout}
              className='flex items-center p-2.5 w-28  cursor-pointer hover:bg-gray-200 rounded-b-md transition-all duration-300 justify-between'
            >
              <p className='mr-2'>Log out </p>
              <FiLogOut />
            </div>
          </div>

          <div className='w-full flex justify-center mt-10'>
            {userData && userData?.profile_photo ? (
              <Image
                src={item.logo}
                alt='Link logo'
                width={64}
                height={64}
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
                    className='flex justify-between items-center my-6 w-full flex-1 border-[1px] p-2 rounded-lg cursor-pointer text-white bg-gray-600 hover:scale-[102%] transition-all duration-300'
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
                    <div className='md:min-w-[200px]'>
                      <h1 className='text-center px-2'>{item?.name}</h1>
                    </div>
                    <div
                      onClick={(e) => handleClickDot(e)}
                      className='hover:scale-125 transition-all duration-300 text-lg mr-3'
                    >
                      <IoShareOutline size={24} />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <div className='h-screen flex items-center justify-center text-white'>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default page;
