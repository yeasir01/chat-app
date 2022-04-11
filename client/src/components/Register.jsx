import * as React from 'react';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch.jsx";
import useAuth from "../hooks/useAuth.jsx";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Copyright from './Copyright.jsx';
import AnimatedAlert from './AnimatedAlert.jsx';
import background from '../assets/images/bg.svg';

const Register = () => {
  const { auth } = useAuth();
  const { response, error, isLoading, request } = useFetch();
  const [formData, setFormData] = React.useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordRepeat: "",
      handle: "",
  });

  const navigate = useNavigate();
  const serverValError = error?.data?.validationErrors;

  const handleChange = (event) => {
      const target = event.target;
      const value = target.type === "checkbox" ? target.checked : target.value;
      setFormData((prev) => ({ ...prev, [target.name]: value }));
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      request.post("/api/auth/register", formData);
  };

  React.useEffect(() => {
      if (response?.ok) {
          return navigate("/login", { replace: false });
      }
  }, [navigate, response]);

  React.useEffect(() => {
      if (auth.isAuthenticated) {
          return navigate("/", { replace: true });
      }
  }, [auth, navigate]);

  return (
      <Box component="main" sx={{
        minHeight: "100vh", 
        display:"flex", 
        justifyContent: "center", 
        alignItems: "center", 
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: (t) =>
        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      >
        <Box component={Paper} elevation={6}  square sx={{p:6, m:6, width: "500px"}}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <HowToRegOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <AnimatedAlert message={error?.statusText} severity="error"/>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    required
                    fullWidth
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    label="First Name"
                    autoFocus
                    helperText={serverValError?.firstName}
                    error={serverValError?.firstName ? true: false}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="family-name"
                    required
                    fullWidth
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    label="Last Name"
                    helperText={serverValError?.lastName}
                    error={serverValError?.lastName ? true: false}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="handle"
                    label="Handle"
                    type="handle"
                    id="handle"
                    value={formData.handle}
                    onChange={handleChange}
                    autoComplete="user-name"
                    helperText={serverValError?.handle}
                    error={serverValError?.handle ? true: false}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    helperText={serverValError?.email}
                    error={serverValError?.email ? true: false}
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
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    helperText={serverValError?.password}
                    error={serverValError?.password ? true: false}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="passwordRepeat"
                    label="Confirm Password"
                    type="password"
                    id="passwordRepeat"
                    value={formData.passwordRepeat}
                    onChange={handleChange}
                    autoComplete="new-password"
                    helperText={serverValError?.passwordRepeat}
                    error={serverValError?.passwordRepeat ? true: false}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I Agree to terms of use"
                    />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, py: 1.5 }} >
                {isLoading ? "Loading..." : "Submit"}
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link component={RouterLink} to="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Box>
  );
}

export default Register;