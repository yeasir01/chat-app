import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Copyright from "../components/Copyright.jsx";
import CollapsibleAlert from "../components/CollapsibleAlert.jsx";
import { Link as RouterLink } from "react-router-dom";
import background from "../assets/images/bg.svg";
import useFetch from "../hooks/useFetch.jsx";
import useStore from "../hooks/useStore.jsx";

const Login = () => {
    
    const [ formData, setFormData ] = useState({
        email: "mike@example.com",
        password: "password",
        remember: false,
    })
    const [formErrors, setFormErrors] = useState({
        email: "",
        password: "",
        remember: "",
    })

    const setAuthUser = useStore(state => state.setAuthUser);

    const { response, error, isLoading, fetchRequest } = useFetch();

    useEffect(()=>{
        if (error?.data?.validationErrors) {
            setFormErrors(state=>({...state, ...error.data.validationErrors}))
        }
    },[error])

    useEffect(()=>{  
        if (response.data.user){
            setAuthUser(response.data.user);
        }
    }, [response, setAuthUser])

    const handleSubmit = (event) => {
        event.preventDefault();

        fetchRequest("/api/auth/login", {
            method: "POST",
            body: formData
        }) 
    };

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const input = type === "checkbox" ? checked : value;
        setFormData((state) => ({ ...state, [name]: input }));
    };

    return (
        <Grid container component="main" sx={{ minHeight: "100vh" }}>
            <Grid item xs={false} sm={5} md={6} lg={7} sx={{
                    backgroundImage: `url(${background})`,
                    backgroundRepeat: "no-repeat",
                    backgroundColor: (t) =>
                        t.palette.mode === "light"
                            ? t.palette.grey[50]
                            : t.palette.grey[900],
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            <Grid
                item
                xs={12}
                sm={7}
                md={6}
                lg={5}
                component={Paper}
                elevation={12}
                square
            >
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <CollapsibleAlert
                        message={error?.statusText}
                        severity="error"
                    />
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={formData.email}
                            onChange={handleInputChange}
                            helperText={formErrors.email}
                            error={!!formErrors.email}
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
                            value={formData.password}
                            onChange={handleInputChange}
                            helperText={formErrors.password}
                            error={!!formErrors.password}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value="remember"
                                    color="primary"
                                    name="remember"
                                    onChange={handleInputChange}
                                    checked={formData.remember}
                                />
                            }
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            disabled={isLoading}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, mb: 2, py: 1.1 }}
                        >
                            {isLoading ? "Loading..." : "Submit"}
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link
                                    component={RouterLink}
                                    to="/forgot"
                                    variant="body2"
                                >
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link
                                    component={RouterLink}
                                    to="/register"
                                    variant="body2"
                                >
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Login;
