import { Helmet } from "react-helmet-async";
import {
  Button,
  Container,
  Stack,
  Typography,
  Card,
  TextField,
} from "@mui/material";
import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChangePassword() {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  const form = useRef();

  const data = window.localStorage.getItem("token");
  const obj = JSON.parse(data);

  const isCustomer = window.localStorage.getItem("customerloggedIn");
  const isAdmin = window.localStorage.getItem("adminloggedIn");
  const isStaff = window.localStorage.getItem("staffloggedIn");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!oldPass || !newPass) {
      toast.error("Please fill all the textfields!");
      return
    }

    if (isCustomer) {
      fetch("https://localhost:7116/api/Customers/changePassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${obj.token}`,
        },
        body: JSON.stringify({
          NewPassword: newPass,
          OldPassword: oldPass,
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
          toast.success("Password changed successfully!");
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.toString);
        });
    } else if (isAdmin) {
      fetch("https://localhost:7116/api/Admin/changePassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${obj.token}`,
        },
        body: JSON.stringify({
          NewPassword: newPass,
          OldPassword: oldPass,
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
          toast.success("Password changed successfully!");
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.toString());
        });
    } else if (isStaff) {
      fetch("https://localhost:7116/api/Staff/changePassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${obj.token}`,
        },
        body: JSON.stringify({
          NewPassword: newPass,
          OldPassword: oldPass,
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
          toast.success("Password changed successfully!");
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.toString());
        });
    }
  };

  return (
    <>
      <Helmet>
        <title> Change Password | Car Rental </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Change Password
          </Typography>
        </Stack>
        <Card style={{ padding: "20px", marginTop: "30px" }}>
          <form ref={form} onSubmit={handleSubmit}>
            <TextField
              fullWidth
              id="old-password"
              label="Old Password"
              variant="outlined"
              style={{ marginBottom: "2vw" }}
              onChange={(e) => setOldPass(e.target.value)}
            />
            <TextField
              fullWidth
              id="new-password"
              label="New Password"
              variant="outlined"
              style={{ marginBottom: "2vw" }}
              onChange={(e) => setNewPass(e.target.value)}
            />
            <Button variant="contained" type="submit">
              Change Password
            </Button>
          </form>
        </Card>
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
      </Container>
    </>
  );
}
