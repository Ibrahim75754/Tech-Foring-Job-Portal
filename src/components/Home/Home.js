import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Container } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useLoaderData } from 'react-router-dom';

const Home = () => {
    const jobs = useLoaderData();
    console.log(jobs);
    const [categories, setCategories] = React.useState([]);
    React.useEffect(() => {
        fetch('http://localhost:5000/categories')
            .then(res => res.json())
            .then(data =>
                setCategories(data));
    }, []);
    console.log(categories);

    const jobItem = (name) => {
        const showJobs = jobs.filter(job => job?.categoryName === name);
        console.log(showJobs);

        return <div>
            {
                showJobs.map(job => <div>{job.jobName}</div>)
            }
        </div>
    }

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Container>
            <Typography variant="h5">BROWSE OPEN POSITIONS BY CATEGORY</Typography>
            <Typography variant="subtitle1" sx={{ mb: 5 }}>We are always on the lookout for talanted people</Typography>

            {
                categories.map(cat =>
                    <Accordion expanded={expanded === `${cat._id}`} onChange={handleChange(`${cat._id}`)} sx={{ border: 1 }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                {cat.categoryName}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                {
                                    jobItem(cat.categoryName)
                                }
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                )
            }

        </Container>
    );
}
export default Home;