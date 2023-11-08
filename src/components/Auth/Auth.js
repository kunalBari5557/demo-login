import React, { useEffect, useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import Input from "./Input";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { login } from "../../redux/fetures/Auth/Auth";
import { AdminLoginSchema } from "./../../ValidationSchema/index";
import { useFormik } from "formik";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 12),
  },
  googleButton: {
    marginBottom: theme.spacing(2),
  },
}));

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const location = useLocation();
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  let is_alert = false;
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const loginForm = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: AdminLoginSchema,
    onSubmit: async (values) => {
      try {
        const actionResult = await dispatch(login(values));

        const { token } = actionResult.payload;
        if (token) {
          localStorage.setItem("Token", token);
          Navigate("/Home");
          toast.dismiss();
          toast.success("Welcome to the dashboard");
        }
      } catch (error) {
        toast.dismiss();
        toast.error("Invalid email or password. Please try again.");
      }
    },
  });

  useEffect(() => {
    const linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.type = "text/css";
    linkElement.href =
      window.location.origin + "/assets/css/authentication/form-2.css";

    document.head.appendChild(linkElement);

    return () => {
      document.head.removeChild(linkElement);
    };
  }, [location]);

  useEffect(() => {
    // return()=>{
    if (location.state !== null) {
      if (is_alert === false) {
        toast.success(location.state);
      }

      is_alert = true;
    }
    window.history.replaceState({}, location.state);

    // }
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar style={{backgroundColor:"#f50057"}} className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
        {/* <form className={classes.form} onSubmit={handleSubmit}> */}
        <form className={classes.form} onSubmit={loginForm.handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            {/* <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            /> */}
            <Input
              name="username"
              label="Username"
              value={loginForm.values.username}
              handleChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
            />
            {loginForm.errors.username && loginForm.touched.username ? (
              <h6 className="text-danger mt-2 ml-1">
                {loginForm.errors.username}
              </h6>
            ) : null}
            <Input
              name="password"
              label="Password"
              // handleChange={handleChange}
              value={loginForm.values.password}
              handleChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {loginForm.errors.password && loginForm.touched.password ? (
              <h6 className="text-danger mt-2 ml-1">
                {loginForm.errors.password}
              </h6>
            ) : null}
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{marginTop:"1rem"}}
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
