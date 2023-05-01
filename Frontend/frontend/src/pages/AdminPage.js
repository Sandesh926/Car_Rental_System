import { Helmet } from "react-helmet-async";
import { useState } from "react";
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  TextField,
  TableCell,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody
} from "@mui/material";

import Iconify from "../components/iconify";
import { Modal } from "antd";
import { useRef, useEffect} from "react";

export default function AdminPage() {
  const [open, setOpen] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [datas, setDatas] = useState([]);

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (e) => {
    e.preventDefault();
    fetch("https://localhost:7116/api/Admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          admin_id: adminId,
          admin_name: adminName,
          admin_password: adminPassword,
          admin_email: adminEmail,
          role_id: roleId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
            console.log("Admin Registered!");
            form.current.reset();
        }).catch((error) => {
          console.log(error);
        });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const form = useRef();

  const [adminId, setAdminId] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminName, setAdminName] = useState("");
  const [roleId, setRoleId] = useState(0);

  useEffect(() => {
    fetch("https://localhost:7116/api/Admin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDatas(data);
        console.log(datas);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <>
      <Helmet>
        <title> Admin | Car Rental </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Admin
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={showModal}
          >
            Add Admin
          </Button>
          <Modal
            title="Register Admin"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            
          >
            <form ref={form}>
            <TextField
              id="admin_id"
              label="Admin ID"
              variant="outlined"
              style={{marginTop: "1vw", marginRight: "1vw"}}
              onChange={(e) => setAdminId(e.target.value)}
            />
            <TextField
              id="admin-name"
              label="Admin Name"
              variant="outlined"
              style={{marginTop: "1vw"}}
              onChange={(e) => setAdminName(e.target.value)}
            />
            <TextField
              id="admin-password"
              label="Admin Password"
              variant="outlined"
              type = "password"
              style={{marginTop: "1vw", marginRight: "1vw"}}
              onChange={(e) => setAdminPassword(e.target.value)}
            />
            <TextField
              id="admin-email"
              label="Admin Email"
              variant="outlined"
              style={{marginTop: "1vw"}}
              onChange={(e) => setAdminEmail(e.target.value)}

            />
            <TextField
              id="admin-roleid"
              label="Role ID"
              variant="outlined"
              style={{marginTop: "1vw"}}
              onChange={(e) => setRoleId(e.target.value)}
            />
            </form>
          </Modal>
        </Stack>

        <Card>
        <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Admin ID</TableCell>
                    <TableCell align="right">Admin Name</TableCell>
                    <TableCell align="right">Admin Email</TableCell>
                    <TableCell align="right">Role ID</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {datas.map((data) => (
                    <TableRow
                      key={data.admin_id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {data.admin_id}
                      </TableCell>
                      <TableCell align="right">{data.admin_name}</TableCell>
                      <TableCell align="right">{data.admin_email}</TableCell>
                      <TableCell align="right">{data.role_id}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        </Card>
      </Container>
    </>
  );
}
