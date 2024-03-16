import React, { useState } from 'react';
import { useRouter } from 'next/router';

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
    <div>
      <h1 className=''>Login</h1>

      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
