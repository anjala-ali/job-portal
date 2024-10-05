import React, { useEffect, useState } from 'react';
import { Typography, Box, Container, Divider, Grid } from '@mui/material';
import JobIcon from '@mui/icons-material/Work';
import UserNavbar from './UserNavbar';
import axios from 'axios';

const Myjobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
    
        useEffect(() => {
            const userId = JSON.parse(localStorage.getItem('currentUser'))?._id;
        
            if (userId) {
                axios.get(`http://localhost:3008/applied-jobs/${userId}`)
                    .then(response => {
                        console.log('Fetched applied jobs:', response.data);
                        setAppliedJobs(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching applied jobs:', error.response?.data || error.message);
                    });
            }
        }, []);

  return (
    <div>
      <UserNavbar />
      <br /><br /><br /><br />
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', p: 2 }}>
        <Typography variant='h4'>My Jobs</Typography>
      </Box>
      <Container maxWidth='md'>
        <Box sx={{ p: 2 }}>
          
          {appliedJobs.length > 0 ? (
            appliedJobs.map((application) => (
              <div key={application._id}>
                <Box sx={{ p: 2 }}>
                  <Divider />
                  <Box sx={{ my: 3 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <JobIcon sx={{ fontSize: 40 }} />
                      </Grid>
                      <Grid item>
                        <Typography variant='h5'>{application.jobId.JobTitle}</Typography>
                      </Grid>
                    </Grid>
                    <Typography variant='h6' sx={{ color: 'grey', mt: 1, ml: 7, textAlign: 'left' }}>
                      {application.jobId.CompanyName}
                    </Typography>
                    <Typography variant='body1' sx={{ color: 'grey', mb: 1, ml: 7, textAlign: 'left' }}>
                      {application.jobId.Location}
                    </Typography>
                    {/* <Typography variant='body2' sx={{ color: 'blue', ml: 7, textAlign: 'left' }}>
                      Applied on {new Date(application.createdAt).toLocaleDateString()}
                    </Typography> */}
                  </Box>
                  <Divider />
                </Box>
              </div>
            ))
          ) : (
            <Typography variant='body1' sx={{ ml: 7 }}>No jobs applied</Typography>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default Myjobs;
