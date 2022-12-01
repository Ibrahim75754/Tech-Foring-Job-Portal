import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Alert } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { AuthContext } from '../../contexts/AuthProvider';



const theme = createTheme();

const Registration = () => {
    const [authError, setAuthError] = React.useState('');

    const navigate = useNavigate();

    const { createUser, updateUser, } = React.useContext(AuthContext)
    const handleSubmit = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        createUser(email, password)
            .then(result => {
                const user = result.user;


                const userInfo = {
                    displayName: name
                }
                updateUser(userInfo)
                    .then(() => {

                    })
                    .catch(err => console.log(err))
                swal("Good job!", "Category Insert successful!", "success");
                navigate('/login')
            })

            .catch(error => {
                setAuthError(error.message)

            });

    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ bgcolor: '#182F59' }} >
                <Box style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                border: 1,
                                padding: 2,
                                borderRadius: 3,
                                bgcolor: 'white'
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Registration
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="name"
                                            required
                                            fullWidth
                                            id="name"
                                            label="Full Name"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"

                                        />
                                    </Grid>

                                </Grid>
                                {authError && <Alert sx={{ width: "1", m: 1 }} severity="error">{authError}</Alert>}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Registration
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link to="/login" variant="body2">
                                            Already have an account? Sign in
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>

                    </Container>
                </Box>
            </Box>

        </ThemeProvider>
    );
}
export default Registration;