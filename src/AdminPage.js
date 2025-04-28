import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const AdminPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('users').select('*');
      if (error) console.error(error);
      else setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleBlockUser = async (userId) => {
    const { error } = await supabase
      .from('users')
      .update({ role: 'blocked' })
      .eq('id', userId);
    if (error) console.error(error);
    else alert('User blocked');
  };

  const handleSetAdmin = async (userId) => {
    const { error } = await supabase
      .from('users')
      .update({ role: 'admin' })
      .eq('id', userId);
    if (error) console.error(error);
    else alert('User set as admin');
  };

  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.email} ({user.role})
            {user.role !== 'admin' && (
              <button onClick={() => handleSetAdmin(user.id)}>Set Admin</button>
            )}
            <button onClick={() => handleBlockUser(user.id)}>Block</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
