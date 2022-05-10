import React, { useReducer } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch.jsx";
import useAuth from "../hooks/useAuth.jsx";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Copyright from "../components/Copyright.jsx";
import AnimatedAlert from "../components/AnimatedAlert.jsx";
import background from "../assets/images/bg.svg";
import { INITIAL_REGISTER_STATE, registerReducer, registerTypes } from "../reducers/register-reducer.js";

const Register = () => {
    const [state, dispatch] = useReducer( registerReducer, INITIAL_REGISTER_STATE );
    const { response, error, isLoading, request } = useFetch();
    
    const auth = useAuth();
    const navigate = useNavigate();

    const serverValError = auth.error?.validationErrors;

    const handleSubmit = (event) => {
        event.preventDefault();
        request("/api/auth/register", {
            method: "POST",
            body: state,
        });
    };

    React.useEffect(() => {
        if (response.ok) {
            return navigate("/login", { replace: false });
        }
    }, [navigate, response]);

    React.useEffect(() => {
        if (auth.isAuthenticated) {
            return navigate("/", { replace: true });
        }
    }, [auth, navigate]);

    return (
        <Box
            component="main"
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage: `url(${background})`,
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                    t.palette.mode === "light"
                        ? t.palette.grey[50]
                        : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <Box
                component={Paper}
                elevation={6}
                sx={{ p: 6, m: 6, width: "500px", borderRadius: 2 }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                        <HowToRegOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <AnimatedAlert
                        message={error?.statusText}
                        severity="error"
                    />
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    required
                                    fullWidth
                                    id="firstName"
                                    name="firstName"
                                    value={state.firstName}
                                    onChange={(e) =>
                                        dispatch({
                                            type: registerTypes.SET_FIRST_NAME,
                                            payload: e.target.value,
                                        })
                                    }
                                    label="First Name"
                                    autoFocus
                                    helperText={serverValError?.firstName}
                                    error={
                                        serverValError?.firstName ? true : false
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="family-name"
                                    required
                                    fullWidth
                                    id="lastName"
                                    name="lastName"
                                    value={state.lastName}
                                    onChange={(e) =>
                                        dispatch({
                                            type: registerTypes.SET_LAST_NAME,
                                            payload: e.target.value,
                                        })
                                    }
                                    label="Last Name"
                                    helperText={serverValError?.lastName}
                                    error={
                                        serverValError?.lastName ? true : false
                                    }
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
                                    value={state.handle}
                                    onChange={(e) =>
                                        dispatch({
                                            type: registerTypes.SET_HANDLE,
                                            payload: e.target.value,
                                        })
                                    }
                                    autoComplete="user-name"
                                    helperText={serverValError?.handle}
                                    error={
                                        serverValError?.handle ? true : false
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    value={state.email}
                                    onChange={(e) =>
                                        dispatch({
                                            type: registerTypes.SET_EMAIL,
                                            payload: e.target.value,
                                        })
                                    }
                                    autoComplete="email"
                                    helperText={serverValError?.email}
                                    error={serverValError?.email ? true : false}
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
                                    value={state.password}
                                    onChange={(e) =>
                                        dispatch({
                                            type: registerTypes.SET_PASSWORD,
                                            payload: e.target.value,
                                        })
                                    }
                                    autoComplete="new-password"
                                    helperText={serverValError?.password}
                                    error={
                                        serverValError?.password ? true : false
                                    }
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
                                    value={state.passwordRepeat}
                                    onChange={(e) =>
                                        dispatch({
                                            type: registerTypes.SET_PASSWORD_REPEAT,
                                            payload: e.target.value,
                                        })
                                    }
                                    autoComplete="new-password"
                                    helperText={serverValError?.passwordRepeat}
                                    error={
                                        serverValError?.passwordRepeat
                                            ? true
                                            : false
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value="allowExtraEmails"
                                            color="primary"
                                        />
                                    }
                                    label="I Agree to terms of use"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, py: 1.1 }}
                        >
                            {isLoading ? "Loading..." : "Submit"}
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link
                                    component={RouterLink}
                                    to="/login"
                                    variant="body2"
                                >
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
};

export default Register;
