import React, { useState } from 'react';
import signInStyles from "./SignInStyle";
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

type signInProps = {
  signIn: (credential: any) => void;
};

export default function SignIn(props: signInProps) {
  const classes = signInStyles();
  const initialValues = {
    username: "",
    password: ""
  };
  const [values, setValues] = useState(initialValues || {});
  const { signIn } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const { name, value } = target;
    event.persist();
    setValues({...values, [name]: value})
  }

  const handleLogin = (event: any) => {
    const email = values.username + '@example.net';
    const credential = {
      email,
      password: values.password
    }
    signIn(credential)
    event.preventDefault();
  }

  return(
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleLogin}
          className={classes.submit}
        >
          Sign In
        </Button>
      </form>
    </div>
  </Container>
  )
}