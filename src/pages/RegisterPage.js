import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import { supabase } from '../supabaseClient';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const hashedPassword = bcrypt.hashSync(password, 10);

    const { data, error } = await supabase
      .from('users')
      .insert([{ email, password: hashedPassword, role: 'user', blocked: false }]);

    if (error) {
      alert(error.message);
    } else {
      alert('Registration successful!');
      navigate('/login');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister}>
        <h2>Register</h2>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
