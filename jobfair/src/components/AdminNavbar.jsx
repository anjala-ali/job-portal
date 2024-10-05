import React from 'react'
import { AppBar,Toolbar,Typography,Button } from '@mui/material'
import { Link } from 'react-router-dom'

const AdminNavbar = () => {
  return (
    <div>
       <AppBar>
        <Toolbar position='static' style={{color:'white', background:'black'}}>
        <Typography variant='h5' sx={{ flexGrow: 1 ,textAlign:'left',ml:2}}>JobElevate</Typography>
            <Link to='/add'><Button variant='text' color='success'  style={{ color: "white", border:'none'}} >Add Jobs</Button></Link>
            <Link to='/viewjobs'><Button variant='text' color='success'  style={{ color: "white", border:'none'}} >View Jobs</Button></Link>
            <Link to='/manage'><Button variant='text' color='success'  style={{ color: "white", border:'none'}} >View Applications</Button></Link>
            <Link to='/'><Button variant='text' color='success'  style={{ color: "white" }}>Logout</Button></Link>
        </Toolbar>
       </AppBar>
    </div>
  )
}

export default AdminNavbar
