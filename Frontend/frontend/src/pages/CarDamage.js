import { Helmet } from 'react-helmet-async';
import { Button, Container, Stack, Typography, Table, TableBody, TableHead, TableCell, Paper, TableContainer, TableRow } from '@mui/material';
import Iconify from '../components/iconify'
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CarDamage() {

  const [damage, setDamage] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7116/api/DamageCar/getDamageCars", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDamage(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.toString())
      });
  }, []);

  return (
    <>
      <Helmet>
        <title> Car Damage | Car Rental </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Car Damage
          </Typography>
        </Stack>
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Damage Date</TableCell>
                <TableCell align="right">Car Name</TableCell>
                <TableCell align="right">Customer Name</TableCell>
                <TableCell align="right">Staff Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {damage.map((data) => (
                <TableRow
                  key={data.rent_id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell align="right">{data.DamageDate}</TableCell>
                  <TableCell align="right">{data.car_name}</TableCell>
                  <TableCell align="right">{data.customer_name}</TableCell>
                  <TableCell align="right">{data.staff_name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
