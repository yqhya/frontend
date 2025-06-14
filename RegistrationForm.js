import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isAdmin: false
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const registerUser = (e) => {
    e.preventDefault();
    fetch('http://localhost:555/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(response => response.json().then(data => ({ ok: response.ok, data })))
      .then(({ ok, data }) => {
        if (!ok) {
          throw new Error(data.message || 'Registration failed');
        }
        setMessage('Registration successful!');
        localStorage.setItem('token', data.token);
        setTimeout(() => navigate('/books'), 1500);
      })
      .catch(error => {
        setMessage(error.message);
      });
  };

  return (
    <div className="form-section">
      <h3>User Registration</h3>
      <form onSubmit={registerUser}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br />
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
        <label>
          <input
            type="checkbox"
            name="isAdmin"
            checked={formData.isAdmin}
            onChange={handleChange}
          />
          Admin
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
      {message && <p style={{ color: message.includes('successful') ? '#28a745' : '#dc3545' }}>{message}</p>}
    </div>
  );
};

export default RegistrationForm;
