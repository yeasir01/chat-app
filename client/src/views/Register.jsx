import { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch.jsx";
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
import CollapsibleAlert from "../components/CollapsibleAlert.jsx";
import background from "../assets/images/bg.svg";

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordRepeat: "",
        handle: "",
    });
    const [formErrors, setFormErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordRepeat: "",
        handle: "",
    });

    const { response, error, isLoading, fetchRequest } = useFetch();

    const navigate = useNavigate();

    useEffect(()=>{
        if (error?.data?.validationErrors) {
            setFormErrors(state=>({...state, ...error.data.validationErrors}))
        }
    },[error])

    useEffect(() => {
        if (response.ok) {
            return navigate("/login", { replace: false });
        }
    }, [navigate, response]);

    const handleSubmit = (event) => {
        event.preventDefault();

        fetchRequest("/api/auth/register", {
            method: "POST",
            body: formData,
        });
    };

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const input = type === "checkbox" ? checked : value;
        setFormData((state) => ({ ...state, [name]: input }));
    };

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
                    <CollapsibleAlert
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
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    label="First Name"
                                    autoFocus
                                    helperText={formErrors.firstName}
                                    error={!!formErrors.firstName}
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
                                    onChange={handleInputChange}
                                    label="Last Name"
                                    helperText={formErrors.lastName}
                                    error={!!formErrors.lastName}
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
                                    onChange={handleInputChange}
                                    autoComplete="user-name"
                                    helperText={formErrors.handle}
                                    error={!!formErrors.handle}
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
                                    onChange={handleInputChange}
                                    autoComplete="email"
                                    helperText={formErrors.email}
                                    error={!!formErrors.email}
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
                                    onChange={handleInputChange}
                                    autoComplete="new-password"
                                    helperText={formErrors.password}
                                    error={!!formErrors.password}
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
                                    onChange={handleInputChange}
                                    autoComplete="new-password"
                                    helperText={formErrors.passwordRepeat}
                                    error={!!formErrors.passwordRepeat}
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
