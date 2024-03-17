import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Input from '../components/input/Input';
import Image from 'next/image';
import Button from '../components/button/Button';

const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    // Here you can implement your login logic, for example, sending a request to your backend
    // with the entered username and password.
    // If login is successful, you can redirect the user to another page using router.push('/dashboard');
    // If login fails, you can show an error message to the user.
    console.log('Logging in with:', username, password);
    // Example redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-[#f0f4f9]'>
      <div className='bg-white w-[900px] h-[380px] rounded-3xl grid grid-cols-2'>
        <div className='col-span-1 m-10'>
          <Image
            src='/facebook.png'
            alt='Example Image'
            width={46}
            height={46}
          />
          <h1 className='text-4xl my-4'>Login</h1>
          <p>to continue to Linkverse</p>
        </div>
        <div className='col-span-1 m-10'>
          <form onSubmit={handleLogin} className='h-full bg-green-300'>
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
            <p className='text-blue-600 font-medium text-sm'>
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
            {/* <button type='submit'>Login</button> */}
            <div className='mt-auto'>
              <Button>Login</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
