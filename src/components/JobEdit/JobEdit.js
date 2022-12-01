import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';

const JobEdit = () => {
    const { editId } = useParams();
    const [job, setJob] = useState({});
    useEffect(() => {
        fetch(`https://tech-foring-job-portal-server.vercel.app/jobs/${editId}`)
            .then(res => res.json())
            .then(data =>
                setJob(data));
    }, [editId]);
    const changeName = e => {
        const updateName = e.target.value;

        const updateJob = { ...job };
        updateJob.jobName = updateName;

        setJob(updateJob);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://tech-foring-job-portal-server.vercel.app/jobs/edit/${job._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(job),
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    swal("Good job!", "Job Update successful!", "success");
                }
            })
    }
    return (
        <div>
            <h1>Edit Job Here.</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    sx={{ width: "50%", mb: 2 }}
                    variant='filled'
                    value={job.categoryName}
                ></TextField><br />
                <TextField
                    sx={{ width: "50%", mb: 2 }}
                    label='Job Name'
                    variant='filled'
                    name='name'
                    value={job.jobName || ''}
                    autoFocus
                    required
                    onChange={changeName}
                ></TextField><br />
                <Button
                    sx={{ width: "50%", mb: 2 }}
                    variant="contained"
                    type='submit'
                >Edit Job</Button>
            </form>
        </div>
    );
};

export default JobEdit;