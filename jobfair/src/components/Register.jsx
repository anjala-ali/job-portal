import React, { useState } from 'react';
import { TextField, Typography, Button } from '@mui/material';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    district: '',
    age: '',
    qualification: '',
    photo: null, // Will store the file object
    username: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
  
    const formPayload = new FormData();
    Object.keys(formData).forEach((key) => {
      formPayload.append(key, formData[key]);
    });
  
    try {
      const response = await fetch('http://localhost:3008/adduser', {
        method: 'POST',
        body: formPayload,
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('User registered successfully');
      } else {
        alert(data.message || 'Failed to register user');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error registering user');
    }
  };

  // const backgroundImageStyle = {
  //   backgroundImage: 'url("https://as2.ftcdn.net/v2/jpg/02/91/08/49/1000_F_291084988_0YubusyMq3Q7iX3PXWmIFLC1lkJrb0mS.jpg")',
  //   backgroundSize: 'cover',
  //   backgroundPosition: 'center',
  //   height: 'cover',
  // };

  return (
    <div  className="login-container">
      <br /><br /><br /><br />
      {/* <div className="container"> */}
        {/* <div>
          <img
            src="https://www.workitdaily.com/media-library/professionals-at-a-job-fair.jpg?id=19634542&width=1200&height=800&quality=85&coordinates=0%2C0%2C0%2C0"
            className="App-logos"
            alt="logo"
          />
          <br />
          <p style={{ marginLeft: '2em', marginRight: '2em', fontSize: '21px', textAlign: 'justify' }}>
            Job Fair 2024 introduces a diverse range of job opportunities through the Pathanamthitta Knowledge District Programme...
          </p>
        </div> */}
        <form onSubmit={handleSubmit}>
          <div className="login-box">
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} style={{ fontWeight: 'bold' }}>
              REGISTER HERE
            </Typography>
            <br />
            <TextField
              id="name"
              label="NAME"
              variant="filled"
              style={{ width: '300px', height: '40px', margin: '10px' }}
              name="name"
              onChange={handleInputChange}
            />
            <br /><br />
            <TextField
              id="city"
              label="CITY"
              variant="filled"
              style={{ width: '300px', height: '40px', margin: '10px' }}
              name="city"
              onChange={handleInputChange}
            />
            <br /><br />
            <TextField
              id="district"
              label="DISTRICT"
              variant="filled"
              style={{ width: '300px', height: '40px', margin: '10px' }}
              name="district"
              onChange={handleInputChange}
            />
            <br /><br />
            <TextField
              id="age"
              label="AGE"
              variant="filled"
              style={{ width: '300px', height: '40px', margin: '10px' }}
              name="age"
              onChange={handleInputChange}
            />
            <br /><br />
            <TextField
              id="qualification"
              label="QUALIFICATION"
              variant="filled"
              style={{ width: '300px', height: '40px', margin: '10px' }}
              name="qualification"
              onChange={handleInputChange}
            />
            <br /><br />
            <input
              type="file"
              style={{ margin: '10px', display: 'block' }}
              name="photo"
              onChange={handleFileChange}
            />
            <br /><br />
            <TextField
              id="username"
              label="USERNAME"
              variant="filled"
              style={{ width: '300px', height: '40px', margin: '10px' }}
              name="username"
              onChange={handleInputChange}
            />
            <br /><br />
            <TextField
              id="password"
              label="PASSWORD"
              variant="filled"
              style={{ width: '300px', height: '40px', margin: '10px' }}
              name="password"
              type="password"
              onChange={handleInputChange}
            />
            <br /><br />
            <TextField
              id="confirmPassword"
              label="CONFIRM PASSWORD"
              variant="filled"
              style={{ width: '300px', height: '40px', margin: '10px' }}
              name="confirmPassword"
              type="password"
              onChange={handleInputChange}
            />
            <br /><br />
            <Button type="submit" variant="contained"  style={{ color: 'white' , background: 'black'}}>
              SIGNUP
            </Button>
            <br /><br /><br />
          </div>
        </form>
      {/* </div> */}
    </div>
  );
};

export default Register;