import { Helmet } from 'react-helmet-async';
import { useState, useRef, useEffect } from 'react';
import {
  Card,
  Stack,
  Button,
  Popover,
  MenuItem,
  Container,
  Typography,
  TextField,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';
import Iconify from '../components/iconify';
import { Modal } from 'antd';

export default function StaffPage() {
  const [open, setOpen] = useState(null);

  const [datas, setDatas] = useState([]);

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (e) => {
    e.preventDefault();
    fetch("https://localhost:7116/api/Staff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          staff_Name: name,
          staff_Email: email,
          staff_Password: password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
            console.log("Staff Registered!");
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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetch("https://localhost:7116/api/Staff", {
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
  }, [handleOk]);


  

  return (
    <>
      <Helmet>
        <title> Staff | Car Rental </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Staff
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={showModal}>
            Add Staff
          </Button>
          <Modal title="Register Staff" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <form ref={form}>
          <TextField
              id="staff-name"
              label="Staff Name"
              variant="outlined"
              style={{marginTop: "1vw", marginRight: "1vw"}}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="staff-email"
              label="Staff Email"
              variant="outlined"
              style={{marginTop: "1vw"}}
              onChange={(e) => setEmail(e.target.value)}

            />
            <TextField
              id="staff-password"
              label="Staff Password"
              variant="outlined"
              type = "password"
              style={{marginTop: "1vw"}}
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>
          </Modal>
        </Stack>

        <Card>
        <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Staff ID</TableCell>
                    <TableCell align="right">Staff Name</TableCell>
                    <TableCell align="right">Staff Email</TableCell>
                    <TableCell align="right">Staff Rating</TableCell>
                    <TableCell align="right">Staff Discount</TableCell>
                    <TableCell align="right">Role ID</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {datas.map((data) => (
                    <TableRow
                      key={data.staff_Id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {data.staff_Id}
                      </TableCell>
                      <TableCell align="right">{data.staff_Name}</TableCell>
                      <TableCell align="right">{data.staff_Email}</TableCell>
                      <TableCell align="right">{data.rating}</TableCell>
                      <TableCell align="right">{data.staff_Discount}</TableCell>
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
