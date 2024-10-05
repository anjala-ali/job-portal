import React from 'react'
import { Toolbar, AppBar, Button, Typography, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import bg3 from '../assets/bg3.jpeg';

const HomeNavbar = () => {
  return (
    <div style={{ 
      backgroundImage: `url(${bg3})`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      height: '100vh', // Full screen height
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      color: 'white', 
      textAlign: 'center' 
    }}>
      <Box sx={{ flexGrow: 1, width: '100%' }}>
        <AppBar position="static" style={{ background: 'black' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{ fontWeight: 'bold' }}>
              JobElevate
            </Typography>
            <Link to="/login">
              <Button variant="text" style={{ color: 'white' }}>Login</Button>
            </Link>&nbsp;&nbsp;&nbsp;
            <Link to="/registration">
              <Button variant="text" style={{ color: 'white' }}>Signup</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h2" component="h1" style={{ fontWeight: 'bold', color:'white'}}>
          Welcome to JobElevate
        </Typography>
        <Typography variant="h5" component="h2" style={{ marginTop: '20px', color:'' }}>
          Your Path to Career Success Starts Here
        </Typography><br /><br />
      </Box>
    </div>
  )
}

export default HomeNavbar
