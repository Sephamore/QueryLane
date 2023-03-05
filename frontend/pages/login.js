import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState} from 'react';
import axios from 'axios'
import { backend } from '@/query.config.js'
import {useRouter} from 'next/router'

const theme = createTheme();

axios.defaults.withCredentials = true

export default function Login() {
  const router = useRouter()

  const [ username, setUsername ] = useState("User_6")
  const [ userDisplayName, setUserDisplayName ] = useState("Abhinav")
  const [ password, setPassword ] = useState('User_6')
  const [ status, setStatus ] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await axios.post(`${backend}/login`, {
      username: username,
      password: password
    });
    console.log(res.data)
    const res2 = await axios.get(`${backend}/login`)
    console.log(res2.data)
    if (res.data.status == 'OK') {
      router.push("/")
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
            Log in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={
                (event) => {
                  setUsername(event.target.value)
                }
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={
                (event) => {
                  setPassword(event.target.value)
                }
              }
            />
            <FormControlLabel
              control={<Checkbox value={status} color="primary" />}
              label="Remember me"
              value={status}
              onChange={(event) => {
                setStatus(event.target.value)
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}