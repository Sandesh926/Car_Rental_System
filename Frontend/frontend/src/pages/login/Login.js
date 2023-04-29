import "./login.css";
import Background from "../../images/bg.jpg";
import Car from "../../images/ferrari.png";
import {Link as RouterLink} from "react-router-dom";
import { TextField, InputLabel, FormControl, Button, Typography, Grid, Link, Select,
MenuItem } from "@mui/material";

function Login() {
  return (
    <section className="login-section">
      <img src={Background} className="bg" />
      <img src={Car} className="car" />
      <div className="login">
      <Typography component="h1" variant="h4" className="title">
            Sign In
          </Typography>
        <TextField id="filled-basic" label="Email" variant="filled" />
        <TextField id="filled-basic" label="Password" variant="filled" type='password' />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={role}
            label="Role"
            // onChange={handleChange}
          >
            <MenuItem value={""}>-- Select Role --</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="customer">Customer</MenuItem>
            <MenuItem value="staff">Staff</MenuItem>
          </Select>
        </FormControl>
        <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
              <RouterLink to="/"><Link variant="body2">
                  Go to homepage
                </Link>
                </RouterLink>
              </Grid>
              <Grid item>
                <RouterLink to="/register"><Link variant="body2">
                  {"Sign Up"}
                </Link>
                </RouterLink>
              </Grid>
            </Grid>
      </div>
    </section>
  );
}

export default Login;
