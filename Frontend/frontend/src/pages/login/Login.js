import "./login.css";
import Background from "../../images/bg.jpg";
import Car from "../../images/ferrari.png";
import { Link as RouterLink } from "react-router-dom";
import {
  TextField,
  InputLabel,
  FormControl,
  Button,
  Typography,
  Grid,
  Link,
  Select,
  MenuItem,
} from "@mui/material";
import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const form = useRef();

  const handleRoleChange = (e) => {
    const value = e.target.value;
    if (value === undefined) {
      setRole("");
    } else {
      setRole(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || !role) {
      toast.error("Please fill all the textfields!");
      return
    }

    // Check if email is in valid format
    const emailPattern = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    if (role === "customer") {
      fetch("https://localhost:7116/api/Customers/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          Password: password,
          Email: email,
        }),
      })
        .then((res) => {
          if (res.status === 400 || res.status === 401 || res.status === 402) {
            return res.json().then((data) => {
              throw new Error(data);
            });
          } else if (res.status !== 200) {
            return res.json().then((data) => {
              throw new Error(data);
            });
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          toast.success("Login Successful!");
          window.localStorage.setItem("token", JSON.stringify(data));
          window.localStorage.setItem(`${role}loggedIn`, true);
          window.localStorage.setItem("role", role);
          window.location.href = "./dashboard/app";
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.toString());
          return
        });
    } else if (role === "admin") {
      fetch("https://localhost:7116/api/Admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          Password: password,
          Email: email,
        }),
      })
        .then((res) => {
          if (res.status === 400 || res.status === 401 || res.status === 402) {
            return res.json().then((data) => {
              throw new Error(data);
            });
          } else if (res.status !== 200) {
            return res.json().then((data) => {
              throw new Error(data);
            });
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          toast.success("Login Successful!");
          window.localStorage.setItem("token", JSON.stringify(data));
          window.localStorage.setItem(`${role}loggedIn`, true);
          window.localStorage.setItem("role", role);
          window.location.href = "./dashboard/app";
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.toString());
        });
    } else if (role === "staff") {
      fetch("https://localhost:7116/api/Staff/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          Password: password,
          Email: email,
        }),
      })
        .then((res) => {
          if (res.status === 400 || res.status === 401 || res.status === 402) {
            return res.json().then((data) => {
              throw new Error(data);
            });
          } else if (res.status !== 200) {
            return res.json().then((data) => {
              throw new Error(data);
            });
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          toast.success("Login Successful!");
          window.localStorage.setItem("token", JSON.stringify(data));
          window.localStorage.setItem(`${role}loggedIn`, true);
          window.localStorage.setItem("role", role);
          window.location.href = "./dashboard/app";
        })
        .catch((error) => {
          toast.error(error.toString());
          console.log(error);
        });
    }
  };

  return (
    <section className="login-section">
      <img src={Background} className="bg" />
      <img src={Car} className="car" />
      <div className="login bg-white">
        <Typography component="h1" variant="h4" className="title">
          Sign In
        </Typography>
        <form ref={form} onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="email"
            label="Email"
            variant="filled"
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: "2vw" }}
          />
          <TextField
            fullWidth
            id="password"
            label="Password"
            variant="filled"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: "2vw" }}
          />
          <FormControl fullWidth>
            <InputLabel id="role">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={role || ""}
              label="Role"
              onChange={handleRoleChange}
              style={{ marginBottom: "2vw" }}
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
        </form>
        <Grid container>
          <Grid item xs>
            <RouterLink to="/">
              <Link variant="body2">Go to homepage</Link>
            </RouterLink>
          </Grid>
          <Grid item>
            <RouterLink to="/register">
              <Link variant="body2">{"Sign Up"}</Link>
            </RouterLink>
          </Grid>
        </Grid>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        limit={1}
      />
    </section>
  );
}

export default Login;
