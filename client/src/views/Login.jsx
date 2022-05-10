import React, { useReducer } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
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
import AnimatedAlert from "../components/AnimatedAlert.jsx";
import useAuth from "../hooks/useAuth.jsx";
import {
    loginTypes,
    loginReducer,
    INITIAL_LOGIN_STATE,
} from "../reducers/login-reducer.js";

import background from "../assets/images/bg.svg";

const Login = () => {
    const [state, dispatch] = useReducer(loginReducer, INITIAL_LOGIN_STATE);

    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";
    const serverValError = auth.error?.validationErrors;

    const handleSubmit = (event) => {
        event.preventDefault();
        auth.login(state);
    };

    React.useEffect(() => {
        if (auth.isAuthenticated) {
            navigate(from, { replace: true });
        }
    }, [auth, from, navigate]);

    return (
        <Grid container component="main" sx={{ minHeight: "100vh" }}>
            <Grid
                item
                xs={false}
                sm={5}
                md={6}
                lg={7}
                sx={{
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
                elevation={6}
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
                    <AnimatedAlert
                        message={auth.error?.statusText}
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
                            value={state.email}
                            onChange={(e) => {
                                dispatch({
                                    type: loginTypes.SET_EMAIL,
                                    payload: e.target.value,
                                });
                            }}
                            helperText={serverValError?.email}
                            error={serverValError?.email ? true : false}
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
                            value={state.password}
                            onChange={(e) => {
                                dispatch({
                                    type: loginTypes.SET_PASSWORD,
                                    payload: e.target.value,
                                });
                            }}
                            helperText={serverValError?.password}
                            error={serverValError?.password ? true : false}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value="remember"
                                    color="primary"
                                    name="remember"
                                    onChange={(e) => {
                                        dispatch({
                                            type: loginTypes.SET_REMEMBER,
                                            payload: e.target.checked,
                                        });
                                    }}
                                    checked={state.remember}
                                />
                            }
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, mb: 2, py: 1.1 }}
                        >
                            {auth.isLoading ? "Loading..." : "Submit"}
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
