import { Helmet } from "react-helmet-async";
import { Button, Container, Stack, Typography, Table, Paper, TableHead, TableContainer, TableRow, TableBody, TableCell } from "@mui/material";
import Iconify from "../components/iconify";
import { useState, useEffect } from "react";

export default function MyRents() {
  const [rentData, setRentData] = useState([]);

  const data = window.localStorage.getItem("token");
  const obj = JSON.parse(data);

  useEffect(() => {
    fetch("https://localhost:7116/myrents", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${obj.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setRentData(data);
        // console.log(datas);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title> My Rents | Car Rental </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            My Rents
          </Typography>
        </Stack>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {/* <TableCell>Car ID</TableCell> */}
                <TableCell align="right">Car Name</TableCell>
                <TableCell align="right">Car Model</TableCell>
                <TableCell align="right">Year</TableCell>
                <TableCell align="right">Color</TableCell>
                <TableCell align="right">Rent Price</TableCell>
                <TableCell align="right">Availability Status</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rentData.map((data) => (
                <TableRow
                  key={data.car_id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell align="right">{data.car_Name}</TableCell>
                  <TableCell align="right">{data.car_Model}</TableCell>
                  <TableCell align="right">{data.year}</TableCell>
                  <TableCell align="right">{data.color}</TableCell>
                  <TableCell align="right">Rs. {data.rent_Price}</TableCell>
                  <TableCell align="right">
                    {data.availability_Status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
