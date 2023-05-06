import { Helmet } from 'react-helmet-async';
import { Container, Typography, Card, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CustomerDetails() {

  const [datas, setDatas] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7116/api/Customers", {
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
        toast.error(error.toString())
      });
  }, []);

  return (
    <>
      <Helmet>
        <title> Customer Details | Car Rental </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Customer
        </Typography>
        <Card>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Customer ID</TableCell>
                  <TableCell align="right">Customer Firstname</TableCell>
                  <TableCell align="right">Customer Lastname</TableCell>
                  <TableCell align="right">Customer Email</TableCell>
                  <TableCell align="right">Customer Phone</TableCell>
                  <TableCell align="right">Customer Address</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {datas.map((data) => (
                  <TableRow
                    key={data.customer_Id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {data.customer_Id}
                    </TableCell>
                    <TableCell align="right">{data.customer_firstName}</TableCell>
                    <TableCell align="right">{data.customer_lastName}</TableCell>
                    <TableCell align="right">{data.customer_Email}</TableCell>
                    <TableCell align="right">{data.customer_Phone}</TableCell>
                    <TableCell align="right">{data.customer_Address}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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