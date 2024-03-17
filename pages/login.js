import React, { useState } from 'react';
import Input from '../components/input/Input';
import Image from 'next/image';
import Button from '../components/button/Button';
import LinearLoading from '../components/loading/LinearLoading';
import { login } from '../server-functions/auth/login';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(username, password);
      console.log('Login successful:', data);
      //   router.push('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-[#f0f4f9]'>
      <div className='bg-white w-[1000px] h-[380px] rounded-3xl overflow-hidden'>
        {loading ? <LinearLoading /> : <div className='h-1' />}
        <div className={`grid grid-cols-2 ${loading ? 'opacity-50' : ''} `}>
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

          <div className='col-span-1 h-full flex-1 mt-10 mr-10'>
            <form
              onSubmit={handleLogin}
              className='h-full flex flex-col justify-between'
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
              <div className='mt-auto'>
                <Button type='submit'>Log in</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
