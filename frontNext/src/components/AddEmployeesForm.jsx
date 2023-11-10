import React, { useState } from 'react';
import axios from 'axios';

export default function AddEmployeesForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Call');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/employees/register', {
        name,
        email,
        username,
        password,
        role,
      });

      console.log(response.data);
      // Обработка успешного ответа
    } catch (error) {
      console.error(error);
      // Обработка ошибки
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select role</option>
            <option value="Call">Call</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

