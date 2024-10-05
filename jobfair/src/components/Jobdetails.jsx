// JobDetails.js
import { Button } from '@mui/material';
import React from 'react';
import { Link, useParams } from 'react-router-dom';


const jobList = [
  { id: 1, title: 'Software Engineer', company: 'Company A', location: 'New York', description: 'Develop software solutions.' },
  { id: 2, title: 'Data Scientist', company: 'Company B', location: 'San Francisco', description: 'Analyze and interpret complex data.' },
  { id: 3, title: 'Web Developer', company: 'Company C', location: 'Los Angeles', description: 'Build and maintain websites.' },
  { id: 4, title: 'Project Manager', company: 'Company D', location: 'Chicago', description: 'Manage and coordinate projects.' },
  // Add more jobs as needed
];

const Jobdetails = () => {
  const { id } = useParams();
  const job = jobList.find((job) => job.id === parseInt(id));
  const handleSave = () => {
    // Handle save logic here
    console.log('Job Saved');
  };

  return (
    <div className="job-details">
        <br /><br /><br /><br /><br /><br /><br /><br />
      {job ? (
        <>
          <h2 align='center'>{job.title}</h2>
          <p><strong>Company:</strong> {job.company}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Description:</strong> {job.description}</p>
          

        </>
      ) : (
        <p>Job not found</p>
      )}
      <div className='button'>
        <Button onClick={handleSave} className='savebutton' variant="contained" color="success" style={{color:'black'}}>Save</Button>
        <Link to='Applyjob'><Button  className='applybutton'variant="contained" color="success" style={{color:'black'}}>Apply</Button></Link>
      </div>
    </div>
    
  );
};

export default Jobdetails;