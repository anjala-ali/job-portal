import React from 'react'
import { Toolbar, AppBar, Button ,Typography} from '@mui/material'
import { Link } from 'react-router-dom'

const UserNavbar = () => {
  return (
    <div>
      <AppBar>
        <Toolbar position='static' style={{color:'white', background:'black'}}>
        <Typography variant='h5' sx={{ flexGrow: 1 ,textAlign:'left',ml:2}}>JobElevate</Typography>
            <Link to='/browse'><Button variant='text' color='success'  style={{ color: "white", border:'none'}} >Browse Jobs</Button></Link>
            <Link to='/myjobs'><Button variant='text' color='success'  style={{ color: "white" }}>My Jobs</Button></Link>
            <Link to='/saved'><Button variant='text' color='success'  style={{ color: "white" }}>Saved Jobs</Button></Link>
            <Link to='/'><Button variant='text' color='success'  style={{ color: "white" }}>Logout</Button></Link>

        </Toolbar>
      </AppBar>
    </div>
  )
}

export default UserNavbar