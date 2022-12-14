import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/system';
import * as React from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';


const ViewJob = () => {
    const [jobs, setJobs] = React.useState([]);
    React.useEffect(() => {
        fetch('https://tech-foring-job-portal-server.vercel.app/jobs')
            .then(res => res.json())
            .then(data => setJobs(data));
    }, []);

    const handleDelete = id => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(`https://tech-foring-job-portal-server.vercel.app/jobs/${id}`, {
                        method: 'DELETE'
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.deletedCount) {
                                swal("Delete successfull", {
                                    icon: "success",
                                });
                                const remaining = jobs.filter(product => product._id !== id);
                                setJobs(remaining);
                            }
                        })

                } else {
                    swal("Your imaginary file is safe!");
                }
            });
    }
    let serial = 1;
    return (
        <Container>
            <TableContainer component={Paper} sx={{ bgcolor: "#F3F4F8" }}>
                <Table sx={{ minWidth: 650 }} aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontSize: '20px' }}>Serial no.</TableCell>
                            <TableCell sx={{ fontSize: '20px' }}>Category Name</TableCell>
                            <TableCell sx={{ fontSize: '20px' }}>Job Name</TableCell>
                            <TableCell align="center" sx={{ fontSize: '20px' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {jobs.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {serial++}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.categoryName}
                                </TableCell>
                                <TableCell >{row.jobName}</TableCell>

                                <TableCell align="center">
                                    <Link to={`${row._id}`}>
                                        <Button sx={{ bgcolor: '#182F59', color: 'white', mr: 2 }}>Edit</Button></Link>
                                    <Button onClick={() => handleDelete(row._id)} sx={{ bgcolor: 'red', color: 'white' }}>Delete</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}
export default ViewJob;