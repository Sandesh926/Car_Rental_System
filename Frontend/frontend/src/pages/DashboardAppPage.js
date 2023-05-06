import { Helmet } from "react-helmet-async";
import {
  Container,
  Typography,
  Table,
  TableContainer,
  TableHead,
  Paper,
  TableCell,
  TableRow,
  TableBody,
} from "@mui/material";
import { Card, Col, Row } from "antd";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DashboardAppPage() {
  const [totalCars, setTotalCars] = useState(0);
  const [totalRents, setTotalRents] = useState(0);
  const [pendingRents, setPendingRent] = useState(0);
  const [frequently, setFrequently] = useState([]);
  const [never, setNever] = useState([])

  useEffect(() => {
    fetch("https://localhost:7116/api/Dashboard/totalcars", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTotalCars(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.toString());
      });
  }, []);

  useEffect(() => {
    fetch("https://localhost:7116/api/Dashboard/totalrents", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTotalRents(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.toString())
      });
  }, []);

  useEffect(() => {
    fetch("https://localhost:7116/api/Dashboard/paidrents", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPendingRent(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.toString())
      });
  }, []);

  useEffect(() => {
    fetch("https://localhost:7116/frequentlyRented", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFrequently(data);
        // data.forEach((element) => {
        //   console.log("Count: " + element.Count);
        // });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.toString())
      });
  }, []);

  useEffect(() => {
    fetch("https://localhost:7116/neverRented", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setNever(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.toString())
      });
  }, []);



  console.log(totalCars);

  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Row gutter={16}>
          <Col span={8}>
            <Card title="Total Cars" bordered={false}>
              {totalCars}
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Total Rents" bordered={false}>
              {totalRents}
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Pending Rents" bordered={false}>
              {pendingRents}
            </Card>
          </Col>
        </Row>

        <Typography variant="h6" sx={{ mt: 5 }}>
          Frequently Rented Cars
        </Typography>
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Car Name</TableCell>
                <TableCell align="right">Car Model</TableCell>
                <TableCell align="right">Year</TableCell>
                <TableCell align="right">Color</TableCell>
                <TableCell align="right">Rent Price</TableCell>
                <TableCell align="right">Availability Status</TableCell>
                <TableCell align="right">Total Rents</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {frequently.map((data) => (
                <TableRow
                  key={data.rent_id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell align="right">{data.car_Name}</TableCell>
                  <TableCell align="right">{data.car_Model}</TableCell>
                  <TableCell align="right">{data.year}</TableCell>
                  <TableCell align="right">{data.color}</TableCell>
                  <TableCell align="right">{data.rent_Price}</TableCell>
                  <TableCell align="right">{data.availability_Status}</TableCell>
                  <TableCell align="right">{data.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h6" sx={{ mt: 5 }}>
          Never Rented Cars
        </Typography>
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Car Name</TableCell>
                <TableCell align="right">Car Model</TableCell>
                <TableCell align="right">Year</TableCell>
                <TableCell align="right">Color</TableCell>
                <TableCell align="right">Rent Price</TableCell>
                <TableCell align="right">Availability Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {never.map((data) => (
                <TableRow
                  key={data.rent_id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell align="right">{data.car_Name}</TableCell>
                  <TableCell align="right">{data.car_Model}</TableCell>
                  <TableCell align="right">{data.year}</TableCell>
                  <TableCell align="right">{data.color}</TableCell>
                  <TableCell align="right">{data.rent_Price}</TableCell>
                  <TableCell align="right">{data.availability_Status}</TableCell>
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
