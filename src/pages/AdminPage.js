import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const AdminPage = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('id, email, role, blocked');
    if (error) console.error(error);
    else setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBlockUser = async (userId) => {
    const { error } = await supabase
      .from('users')
      .update({ blocked: true })
      .eq('id', userId);
    if (error) {
      console.error(error);
    } else {
      alert('User blocked');
      fetchUsers(); // Refresh users list
    }
  };

  const handleSetAdmin = async (userId) => {
    const { error } = await supabase
      .from('users')
      .update({ role: 'admin' })
      .eq('id', userId);
    if (error) {
      console.error(error);
    } else {
      alert('User set as admin');
      fetchUsers(); // Refresh users list
    }
  };

  const handleRemoveAdmin = async (userId) => {
    const { error } = await supabase
      .from('users')
      .update({ role: 'user' })
      .eq('id', userId);
    if (error) {
      console.error(error);
    } else {
      alert('Admin removed, user downgraded.');
      fetchUsers(); // Refresh users list
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.email} ({user.role}) {user.blocked && '[Blocked]'}
            <div>
              {user.role !== 'admin' && (
                <button onClick={() => handleSetAdmin(user.id)}>Set Admin</button>
              )}
              {user.role === 'admin' && (
                <button onClick={() => handleRemoveAdmin(user.id)}>Remove Admin</button>
              )}
              {!user.blocked && (
                <button onClick={() => handleBlockUser(user.id)}>Block User</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
