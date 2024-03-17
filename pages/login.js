import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Input from '../components/input/Input';

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
          <h1 className=''>Login</h1>
        </div>
        <div className='col-span-1 m-10'>
          <form onSubmit={handleLogin}>
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
            <button type='submit'>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
