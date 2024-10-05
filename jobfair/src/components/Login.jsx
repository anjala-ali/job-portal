import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3008/logi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({ username, password }),
        
      });
      

      const data = await response.json();

      if (response.ok) {
        // Store authentication token or user info if applicable
        localStorage.setItem('authToken', data.token); // Example token storage
        localStorage.setItem('userId', data.userId); 

        // Navigate based on user role or type
        if (data.type === 'admin') {
          navigate('/navbaradmin');
        } else if (data.type === 'user') {
          navigate('/usernav');
        }
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error logging in');
    }
  };

  // const backgroundImageStyle = {
  //   backgroundImage: 'url("https://as2.ftcdn.net/v2/jpg/02/91/08/49/1000_F_291084988_0YubusyMq3Q7iX3PXWmIFLC1lkJrb0mS.jpg")',
  //   backgroundSize: 'cover',
  //   backgroundPosition: 'center',
  //   height: '100vh',
  // };

  return (
    <div className="login-container">
      
      <div className="login-box">
        <form onSubmit={handleLogin}>
          <TextField 
            id="username" 
            label="USERNAME" 
            onChange={(e) => setUsername(e.target.value)} 
            value={username}
            variant="filled" 
            size="small" 
            style={{ width: '300px', height: '40px', margin: '10px' }} 
          />
          <br /><br />
          <TextField 
            id="password" 
            label="PASSWORD" 
            variant="filled" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            size="small" 
            type="password"
            style={{ width: '300px', height: '40px', margin: '10px' }} 
          />
          <br /><br />
          <Button type="submit" variant="contained" style={{ color: 'white' , background: 'black'}}>
            LOGIN
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;