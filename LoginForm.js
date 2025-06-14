import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const loginUser = (e) => {
    e.preventDefault();
    fetch('http://localhost:555/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(response => response.json().then(data => ({ ok: response.ok, data })))
      .then(({ ok, data }) => {
        if (!ok) {
          throw new Error(data.message || 'Invalid credentials');
        }
        localStorage.setItem('token', data.token);
        setMessage('Login successful!');
        if (data.user.isAdmin) {
          setTimeout(() => navigate('/addbook'), 1500);
        } else {
          setTimeout(() => navigate('/books'), 1500);
        }
      })
      .catch(error => {
        setMessage(error.message);
      });
  };

  return (
    <div className="form-section">
      <h3>User Login</h3>
      <form onSubmit={loginUser}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
      {message && <p style={{ color: message.includes('successful') ? '#28a745' : '#dc3545' }}>{message}</p>}
    </div>
  );
};

export default LoginForm;
