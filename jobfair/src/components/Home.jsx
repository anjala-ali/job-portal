import { Box, Typography } from '@mui/material'
import React from 'react'
import bg3 from '../assets/bg3.jpeg';
const Home = () => {
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

export default Home


