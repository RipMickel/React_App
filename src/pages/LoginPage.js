import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(data.user));  // Save user info in localStorage
      }
      navigate('/home');  // Use navigate instead of history.push
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <label>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          Remember Me
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
