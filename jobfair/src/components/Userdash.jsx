import { AppBar, Button, Drawer, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react'
import { Link } from 'react-router-dom'
import { Sidebar } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import { logoutAction } from '../action/authAction';


const Userdash = () => {
  let user=JSON.parse(localStorage.getItem('user_info'))
  const navigate = useNavigate(); // Corrected
  const dispatch = useDispatch();

  const handleLogout = () => {
   
    // Clear sessionStorage or localStorage
    localStorage.clear();
    sessionStorage.clear();

    // Redirect to login or home page
    navigate('/'); // Corrected to use navigate('/login') for v6
    
 
  };
  
  return (
    <div>
         {/* <Drawer variant="persistent" anchor="left" open={open}> */}
      <AppBar position="relative" color="secondary">
        <Toolbar>
            {/* <Sidebar></Sidebar> */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Job Fair
          </Typography>
          <Link to="">
          <Button variant="contained" color="secondary">Browse jobs</Button>
          </Link>
          <Link to="">
          <Button variant="contained" color="secondary">View Applied Jobs</Button>
          </Link>
          <Link to="/user">
          <Button variant="contained" color="secondary">Update Profile</Button>
          </Link>
          {/* <Link to=""> */}
          <Button variant="contained" color="secondary" onClick={handleLogout}>Log Out</Button>
          {/* </Link> */}
        </Toolbar>
      </AppBar>
      {/* </Drawer> */}

    </div>
  )
}

export default Userdash
