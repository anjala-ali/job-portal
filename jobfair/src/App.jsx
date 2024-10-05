import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'

import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import Userdash from './components/Userdash'
import Home from './components/Home'
import Admin from './components/Admin'
import Profile from './components/Profile'
import Myjobs from './components/Myjobs'
import Savedjobs from './components/Savedjobs'
import BrowseJobs from './components/Browsejobs'
import Jobdetails from './components/Jobdetails'
import HomeNavbar from './components/HomeNavbar'
import AdminNavbar from './components/AdminNavbar'
import AddOrUpdateJob from './components/AddOrUpdateJob'
import ManageJobs from './components/ManageJobs'
import ManageApplications from './components/ManageApplications'
import UserNavbar from './components/UserNavbar'
import Signin from './components/loginandreg/Signin.jsx'
import Signup from './components/loginandreg/Signup.jsx'

function App() {
  

  return (
    <>
      
      

      <Routes>
      <Route path="/" element={<div><Navbar /><Home/></div>}></Route>
      {/* <Route path='/login' element={<div><Navbar /><br /><br /><br /><br /><br /><br /><br /><br /><Signin /></div>}/> */}
      {/* <Route path='/register' element={<Signup/>}/> */}
      <Route path="/login" element={<div><Navbar /><br /><br /><br /><br /><br /><br /><br /><br /><Signin /></div>}></Route>
        <Route path="/registration" element={<div><Navbar /><Signup/></div>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/user" element={<div><Userdash/><Profile/></div>}></Route>
        <Route path="/admin" element={<Admin/>}></Route>
        <Route path='/myjobs' element={<Myjobs/>} />
            <Route path='/saved' element={<Savedjobs/>}/>
            <Route path='/browse' element={<div><UserNavbar/><BrowseJobs/></div>}/>
            {/* <Route path='/job/:id' element={<Jobdetails/>}/> */}
            <Route path='/usernav' element={<UserNavbar/>}/>
            <Route path='/hom' element={<HomeNavbar/>}/>
            <Route path='/navbaradmin' element={<AdminNavbar/>}/> 
            <Route path='/add' element={<AddOrUpdateJob/>}/>
            <Route path='/viewjobs' element={<ManageJobs/>}/>
            <Route path='/manage' element={<ManageApplications/>}/>
      </Routes>
    </>
  )
}

export default App
