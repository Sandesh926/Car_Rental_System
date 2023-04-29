import "./register.css";
import Background from "../../images/bg.jpg";
import Car from "../../images/ferrari.png";
import { Link as RouterLink } from "react-router-dom";
import { TextField, Button, Typography, Grid, Link } from "@mui/material";

function Register() {
  return (
    <section className="register-section">
      <img src={Background} className="bg" />
      <img src={Car} className="car" />
      <div className="register">
        <Typography component="h1" variant="h4" className="title">
          Sign Up
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField id="first-name" label="First Name" variant="filled" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField id="last-name" label="Last Name" variant="filled" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField id="email" label="Email" variant="filled" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField id="address" label="Address" variant="filled" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="password"
              label="Password"
              variant="filled"
              type="password"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="confirm-password"
              label="Confirm Password"
              variant="filled"
              type="password"
            />
          </Grid>
          {/* <Grid item xs={12} sm={12}>
            <TextField
              id="license"
              label="Driving License or Citizenship"
              variant="filled"
            />
          </Grid> */}
        </Grid>
        <TextField
              id="license"
              label="Driving License or Citizenship"
              variant="filled"
            />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 1, mb: 2 }}
        >
          Sign Up
        </Button>
        <Grid container>
          <Grid item xs>
            <RouterLink to="/">
              <Link variant="body2">Go to homepage</Link>
            </RouterLink>
          </Grid>
          <Grid item>
            <RouterLink to="/login">
              <Link variant="body2">{"Sign In"}</Link>
            </RouterLink>
          </Grid>
        </Grid>
      </div>
    </section>
  );
}

export default Register;
