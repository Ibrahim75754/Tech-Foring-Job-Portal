import React from 'react';
import { useLoaderData } from 'react-router-dom';

const JobEdit = () => {
    const job = useLoaderData();
    console.log(job)
    return (
        <div>
            <h1>Edit Job Here.</h1>
        </div>
    );
};

export default JobEdit;