import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TextField, Button, Typography,Box } from '@mui/material';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';

const AddOrUpdateJob = () => {
    const location = useLocation();
    const job = location.state ? location.state.value : null;

    const [formData, setFormData] = useState({
        JobTitle: '',
        CompanyName: '',
        Location: '',
        Sal: '',
        Skills: '',
        Description: ''
    });

    useEffect(() => {
        if (job) {
            setFormData(job);
        }
    }, [job]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        if (job) {
            // Update existing job
            axios.put(`http://localhost:3008/update/${job._id}`, formData)
                .then((res) => {
                    alert(res.data.message);
                })
                .catch((error) => console.log(error));
        } else {
            // Add new job
            axios.post('http://localhost:3008/add', formData)
                .then((res) => {
                    alert(res.data.message);
                })
                .catch((error) => console.log(error));
        }
    };

    return (
        <div>
          <AdminNavbar/><br /><br /><br /><br /><br />
          <Box display='flex' justifyContent='center'>
            <Typography variant="h4">{job ? 'Update Job' : 'Add Job'}</Typography>
            </Box>
            <form>
                <TextField name="JobTitle" label="Job Title" value={formData.JobTitle} onChange={handleChange} fullWidth margin="normal" />
                <TextField name="CompanyName" label="Company Name" value={formData.CompanyName} onChange={handleChange} fullWidth margin="normal" />
                <TextField name="Location" label="Location" value={formData.Location} onChange={handleChange} fullWidth margin="normal" />
                <TextField name="Sal" label="Salary" value={formData.Sal} onChange={handleChange} fullWidth margin="normal" />
                <TextField name="Skills" label="Required Skills" value={formData.Skills} onChange={handleChange} fullWidth margin="normal" />
                <TextField name="Description" label="Description" value={formData.Description} onChange={handleChange} fullWidth margin="normal" />
                <Box display="flex" justifyContent="center">
                <Button variant="contained" color="primary" onClick={handleSubmit} style={{background:'black'}}>
                    {job ? 'Update Job' : 'Add Job'}
                </Button>
                </Box>
            </form>
        </div>
    );
};

export default AddOrUpdateJob;
