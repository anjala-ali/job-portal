import { Typography, Box, Container, Divider, Grid, Button } from '@mui/material';
import JobIcon from '@mui/icons-material/Work';
import React ,{useState,useEffect} from 'react';
// import Navbar from './Navbar';
import UserNavbar from './UserNavbar';
import axios from 'axios';

const Savedjobs = () => {

 const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
      const userId = JSON.parse(localStorage.getItem('currentUser'))?._id;
      // const userId = user ? user._id : null;

      if (userId) {
          axios.get(`http://localhost:3008/saved-jobs/${userId}`)
              .then(response => {
                  // Log the response data
                  setSavedJobs(response.data);
              })
              .catch(error => {
                  console.error('Error fetching saved jobs:', error);
                 
              });
      } 
  }, []);

  return (
    <div>
      <UserNavbar/>
      <br /><br /><br /><br />
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', p: 2 }}>
        <Typography variant='h4' >Saved Jobs</Typography>
      </Box>
      <Container maxWidth='md'>
        <Box sx={{ p: 2 }}>
          <Divider />
          {savedJobs.map(val =>(
               <Box sx={{ my: 3 }}>
               <Grid container spacing={2} alignItems="center">
                 <Grid item>
                   <JobIcon sx={{ fontSize: 40}} />
                 </Grid>
                 <Grid item>
                   <Typography variant='h5' >{val.jobId.JobTitle}</Typography>
                 </Grid>
                
               </Grid>
               <Grid>
               <Typography variant='h6' sx={{ color: 'grey', mt: 1 , ml:7, textAlign:'left'}}>{val.jobId.CompanyName}</Typography>
               </Grid>
               <Typography variant='body1' sx={{ color: 'grey', mb: 1 ,ml:7,textAlign:'left'}}>{val.jobId.Location}</Typography>
               {/* <Typography variant='body2' sx={{ color: 'blue' ,ml:7,textAlign:'left'}}>Saved on Friday</Typography> */}
             </Box>
          ))}
         
        
          {/* You can add more job entries here in the same pattern */}
        </Box>
      </Container>
    </div>
  );
}

export default Savedjobs;
