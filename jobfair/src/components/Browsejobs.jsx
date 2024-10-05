import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputBase, Paper, Button } from '@mui/material';
import axios from 'axios';
import './BrowseJobs.css';

const BrowseJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3008/view')
      .then((res) => setJobs(res.data))
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (event) => setSearchTerm(event.target.value);

  const handleJobClick = (jobId) => navigate(`/job/${jobId}`);

  const handleApply = (jobId) => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const userId = user ? user._id : null;

    console.log('User:', user); // Debug: Check user object
    console.log('User ID:', userId); // Debug: Check user ID

    if (!userId) {
        alert('Please log in to apply for jobs.');
        return;
    }

    axios.post('http://localhost:3008/apply', { userId, jobId })
        .then(() => {
            alert('Job applied successfully!');
            // Navigate to My Jobs page
            navigate('/myjobs');

            // Fetch and update applied jobs count
            axios.get(`http://localhost:3008/applied-jobs/${userId}`)
                .then(response => {
                    // Calculate the applied jobs count
                    const appliedJobsCount = response.data.length;
                    // Update the local storage
                    localStorage.setItem('appliedJobsCount', appliedJobsCount);
                })
                .catch(error => {
                    console.error('Error fetching applied jobs count:', error.response?.data || error.message);
                });
        })
        .catch(error => {
            console.error('Error applying for job:', error.response?.data || error.message);
        });
};

const handleSave = (jobId) => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const userId = user ? user._id : null;

  console.log("User",user);
  console.log("User ID",userId);

  if (!userId) {
      alert('Please log in to save jobs.');
      return;
  }

  axios.post('http://localhost:3008/save-job', { userId, jobId })
  .then(() => {
      alert('Job saved successfully!');
      navigate('/saved'); // Navigate after saving the job
  })
  .catch(error => {
      console.error('Error saving job:', error.response?.data || error.message);
  });
};

  const filteredJobs = jobs.filter((job) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const jobTitle = job.JobTitle ? job.JobTitle.toLowerCase() : '';
    const companyName = job.CompanyName ? job.CompanyName.toLowerCase() : '';
    const location = job.Location ? job.Location.toLowerCase() : '';

    return (
      jobTitle.includes(lowerCaseSearchTerm) ||
      companyName.includes(lowerCaseSearchTerm) ||
      location.includes(lowerCaseSearchTerm)
    );
  });

  return (
    <div className="App">
      <div className="parent-container">
        <Paper component="form" className="search-container" onSubmit={(e) => e.preventDefault()}>
          <InputBase
            className="search-bar"
            placeholder="Search jobs by title, company, or location..."
            inputProps={{ 'aria-label': 'search jobs' }}
            value={searchTerm}
            onChange={handleChange}
          />
          <IconButton type="submit" className="search-button" aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
      <div className="job-list">
        {filteredJobs.length > 0 ? (
          <div className="job-grid">
            {filteredJobs.map((job) => (
              <div key={job._id} className="job-card" onClick={() => handleJobClick(job._id)}>
                <h2>{job.JobTitle}</h2>
                <p>{job.CompanyName}</p>
                <p>{job.Location}</p>
                <p>{job.Skills}</p>
                <p>{job.Sal}</p>
                <p>{job.Description}</p><br />
                <div className="button">
                  <Button onClick={() => handleSave(job._id)} className="savebutton" variant="contained" color="success" style={{ background: 'grey' }}>Save</Button>&nbsp;&nbsp;
                  <Button onClick={() => handleApply(job._id)} className="applybutton" variant="contained" color="success" style={{ background: 'black' }}>Apply</Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No jobs found</p>
        )}
      </div>
    </div>
  );
};

export default BrowseJobs;
