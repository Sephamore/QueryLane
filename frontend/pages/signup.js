import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react'
import style from '@/styles/signup.module.css'
import { backend } from '@/query.config';
import { useRouter } from 'next/router';
import axios from 'axios';

axios.defaults.withCredentials = true
const theme = createTheme();

export default function SignUp() {
    const router = useRouter();
    const [ passwordMatch, setPasswordMatch ] = useState(true);

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [repassword, setRepassword] = useState("")
    const [usernameAvailable, setUsernameAvailable] = useState(true)

    const checkUserName = async (name) => {
        const res = await axios.get(`${backend}/isNameAvailable/${name}`);
        if (res.data.status == "OK") {
            setUsernameAvailable(true)
        } else {
            setUsernameAvailable(false)
        }
        console.log(res.data)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await axios.get(`${backend}/isNameAvailable/${username}`);

        if(res.data.status === 'OK') {
            setUsernameAvailable(true);
        } else {
            setUsernameAvailable(false);
        }

        if(usernameAvailable) {
            const createUser = await axios.post(`${backend}/signup`, {
                firstName: firstName,
                lastName: lastName,
                username: username,
                password: password
            });

            if(createUser.data.status === 'OK') {
                await router.push('/');
            }
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                value={firstName}
                                onChange={(e) => {
                                    setFirstName(e.target.value);
                                }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                value={lastName}
                                onChange={(e) => {
                                    setLastName(e.target.value);
                                }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    checkUserName(e.target.value)
                                }}
                                />
                                <Box style={{ color: "red" }}>
                                    { !usernameAvailable && "username not available" }
                                </Box>
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
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordMatch(e.target.value == repassword);
                                }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                required
                                fullWidth
                                name="repassword"
                                label="Re-enter Password"
                                type="password"
                                id="repassword"
                                autoComplete="new-password"
                                value={repassword}
                                onChange={(e) => {
                                    setRepassword(e.target.value);
                                    setPasswordMatch(e.target.value == password);
                                    // console.log(passwordMatch)
                                    // console.log(passwordMatch, e.target.value)
                                }}
                                />
                            </Grid>
                            {/* <Grid item xs={12}>
                                <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid> */}
                        </Grid>
                        {
                            !passwordMatch && repassword != "" && 
                            <div className={style.no_pass_match}>
                                passwords do not match
                            </div>
                        }
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={ (password != repassword) || firstName == "" || lastName == "" || username == "" || password == "" || !usernameAvailable }
                        >
                        Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Log in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {/* <Copyright sx={{ mt: 5 }} /> */}
            </Container>
        </ThemeProvider>
    );
}