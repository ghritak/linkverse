import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Input from '../components/input/Input';
import Image from 'next/image';
import Button from '../components/button/Button';
import LinearLoading from '../components/loading/LinearLoading';

const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Logging in with:', username, password);

    // router.push('/dashboard');
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-[#f0f4f9]'>
      <div className='bg-white w-[900px] h-[380px] rounded-3xl overflow-hidden'>
        {loading && <LinearLoading />}
        <div className=' grid grid-cols-2'>
          <div className='col-span-1 m-10'>
            <Image
              src='/facebook.png'
              alt='Example Image'
              width={46}
              height={46}
            />
            <h1 className='text-4xl my-4'>Log in</h1>
            <p>to continue to Linkverse</p>
          </div>

          <div className='col-span-1 m-10 '>
            <form
              onSubmit={handleLogin}
              className='flex flex-col h-full bg-green-300'
            >
              <div>
                <Input
                  label='Email'
                  type='text'
                  id='username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <Input
                  label='Password'
                  type='password'
                  id='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <p className='text-blue-600 font-medium text-sm cursor-pointer'>
                  Forgot password?
                </p>
                <div className='mt-5'>
                  <p className='text-sm'>
                    Not your computer? Use Guest mode to sign in privately.{' '}
                    <span className='text-blue-600 font-medium cursor-pointer'>
                      Learn more about using Guest mode
                    </span>
                  </p>
                </div>
              </div>
              {/* This div will push the button to the bottom */}
              <div className='flex-grow' />
              <div>
                <Button>Log in</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
