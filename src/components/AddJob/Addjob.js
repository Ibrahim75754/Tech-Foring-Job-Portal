import { Button, Grid, TextField } from '@mui/material';
import React from 'react';
import swal from 'sweetalert';

const Addjob = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const category = e.target.name.value;
        const data = { categoryName: category }
        console.log(data)

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
                <Grid item xs={12}>

                </Grid>

            </Grid>
        </div>
    );
};

export default Addjob;