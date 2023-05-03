import "./register.css";
import Background from "../../images/bg.jpg";
import Car from "../../images/ferrari.png";
import { Link as RouterLink } from "react-router-dom";
import { TextField, Button, Typography, Grid, Link } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  // const [document, setDocument] = useState("");

  // const form = useRef();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !phone || !address) {
      alert("Please fill all the textfields!")
      return
    }

    fetch("https://localhost:7116/api/Customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          customer_firstName: firstName,
          customer_lastName: lastName,
          customer_Email: email,
          password,
          customer_Phone: phone,
          customer_Address: address,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
            alert("Customer Registered!");
            navigate("/login")
            // form.current.reset();
        }).catch((error) => {
          console.log(error);
        });
  }

  return (
    <section className="register-section">
      <img src={Background} className="bg" />
      <img src={Car} className="car" />
      <div className="register">
        <Typography component="h1" variant="h4" className="title">
          Sign Up
        </Typography>
        <Grid container spacing={3}>
        {/* <form ref={form}> */}
          <Grid item xs={12} sm={6}>
            <TextField
              id="first-name"
              label="First Name"
              variant="filled"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="last-name"
              label="Last Name"
              variant="filled"
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="email"
              label="Email"
              variant="filled"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="address"
              label="Address"
              variant="filled"
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="password"
              label="Password"
              variant="filled"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="phone-number"
              label="Phone Number"
              variant="filled"
              onChange={(e) => setPhone(e.target.value)}
            />
          </Grid>
          {/* </form> */}
        </Grid>
        {/* <TextField
          id="license"
          label="Driving License or Citizenship"
          variant="filled"
          onChange={(e) => setDocument(e.target.value)}
        /> */}
        <Button
          onClick={handleSubmit}
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
