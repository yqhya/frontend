import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        fetch('http://localhost:555/user/logout', {
            method: 'POST',
            credentials: 'include'
        })
        .then(response => {
            if (response.ok) {
                localStorage.removeItem('token');
                localStorage.removeItem('cart');
                alert('Logged out successfully');
                navigate('/login');
            } else {
                alert('Logout failed');
            }
        })
        .catch(error => {
            console.error('Logout error:', error);
            alert('An error occurred during logout');
        });
    };

    return (
        <nav className="navbar">
            <div className="nav-brand">
                Harry Potter Bookstore
            </div>
            <div className="nav-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/books" className="nav-link">Books</Link>
                <Link to="/cart" className="nav-link">Cart</Link>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/register" className="nav-link">Register</Link>
                <button onClick={handleLogout} className="nav-link" style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>Logout</button>
            </div>
        </nav>
    );
};

export default NavBar;