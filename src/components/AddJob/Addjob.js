import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import swal from 'sweetalert';

const Addjob = () => {
    const categories = useLoaderData();

    const handleSubmit = (e) => {
        e.preventDefault();
        const category = e.target.name.value;
        const data = { categoryName: category }

        fetch(`http://localhost:5000/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    swal("Good job!", "Category Insert successful!", "success");
                }
            })
        e.target.reset();
    }

    const [selectCt, setSelectCt] = useState("");
    const handleChange = (e) => {
        setSelectCt(e.target.value);
    };

    const addProduct = (e) => {
        e.preventDefault();
        const jobName = e.target.name.value;
        const data = { categoryName: selectCt, jobName: jobName }
        console.log(data);
        fetch(`http://localhost:5000/jobs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    swal("Good job!", "Job Added successful!", "success");
                }
            })
        e.target.reset();
    }
    return (
        <div>
            <Grid container spacing={2} sx={{ mt: 8 }}>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            sx={{ width: "50%", mb: 2 }}
                            label="Add New Category"
                            variant="filled"
                            name="name"
                            placeholder='Category Name' /><br />

                        <Button
                            sx={{ width: "50%", mb: 2 }}
                            variant="contained"
                            type="submit"
                        >Add Category</Button>
                    </form>
                </Grid>
                <Grid item xs={12} sx={{ mt: 16 }}>
                    <Typography variant='h5' sx={{ mb: 5 }}>Add A Job Here.</Typography>

                    <form onSubmit={addProduct}>
                        <FormControl variant="standard" required sx={{ m: 1, width: "50%" }}>
                            <InputLabel id="demo-simple-select-standard-label">Selecte Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={selectCt}
                                onChange={handleChange}
                                label="Selecte Category"
                            >
                                <MenuItem value="">
                                    <em>Category List :</em>
                                </MenuItem>
                                {
                                    categories.map(category => (
                                        <MenuItem key={category._id} value={category.categoryName}
                                        >{category.categoryName}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <TextField
                            sx={{ width: "50%", mb: 2 }}
                            label='Job Name'
                            variant='filled'
                            name='name'
                            placeholder='Job Name'
                            required
                        ></TextField><br />
                        <Button
                            sx={{ width: "50%", mb: 2 }}
                            variant="contained"
                            type='submit'
                        >Add Job</Button>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
};

export default Addjob;