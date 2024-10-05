import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
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
    </div>
  )
}

export default Navbar
