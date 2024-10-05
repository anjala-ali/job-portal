import React, { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';
import { TableContainer, TableHead, Typography, Table, TableRow, TableCell, TableBody, Button,Box} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ManageJobs = () => {
    const [job, setJob] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3008/view')
            .then((res) => {
            console.log(res.data); 
                setJob(res.data);
            })
            .catch((error) => console.log(error));
    }, []);

    const delValue = (id) => {
        axios.delete('http://localhost:3008/remove/' + id)
            .then((res) => {
                alert(res.data.message);
                window.location.reload();
            })
            .catch((error) => console.log(error));
    };

    const updateValue = (value) => {
        navigate('/add', { state: { value } });
    };

    return (
        <div>
            <AdminNavbar />
            <br /><br /><br /><br /><br />
            <Box display='flex' justifyContent='center'>
            <Typography variant='h4'>Job Details</Typography><br /><br /><br /><br />
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Job Title</TableCell>
                            <TableCell>Company Name</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Salary</TableCell>
                            <TableCell>Required Skills</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Update</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {job.map((val) => (
                            <TableRow key={val._id}>
                                <TableCell>{val.JobTitle}</TableCell>
                                <TableCell>{val.CompanyName}</TableCell>
                                <TableCell>{val.Location}</TableCell>
                                <TableCell>{val.Sal}</TableCell>
                                <TableCell>{val.Skills}</TableCell>
                                <TableCell>{val.Description}</TableCell>
                                <TableCell>
                                    <Button variant='contained' size='small' color='success' style={{background:'black'}} onClick={() => updateValue(val)}>
                                        Update
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant='contained' size='small' color='error' style={{background:'grey'}} onClick={() => delValue(val._id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ManageJobs;
