import { Helmet } from "react-helmet-async";
import {
  Button,
  Container,
  Stack,
  Typography,
  Table,
  TableCell,
  TableHead,
  Paper,
  TableContainer,
  TableRow,
  TableBody,
} from "@mui/material";
import Iconify from "../components/iconify";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ManageRents() {
  const [rentData, setRentData] = useState([]);
  const [carID, setCarID] = useState("");

  const data = window.localStorage.getItem("token");
  const obj = JSON.parse(data);


  const handleAccept = (id) => {
    fetch(`https://localhost:7116/accept/${id}`, {
      method: "PUT",
      headers: {
        // "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${obj.token}`
      },
    })
    .then((res) => {
      if (res.status === 400 || res.status === 401 || res.status === 402 || res.status !== 200) {
        return res.json().then((data) => {
          throw new Error(data);
        });
      } 
      return res.json();
    })
      .then((data) => {
        // setRentData(data);
        toast.success(data.toString());
        // console.log(datas);
      })
      .catch((error) => {
        toast.error(error.toString());
      });
  };

  const handleReject = (id) => {
    fetch(`https://localhost:7116/reject/${id}`, {
      method: "PUT",
      headers: {
        // "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${obj.token}`
      },
    })
    .then((res) => {
      if (res.status === 400 || res.status === 401 || res.status === 402 || res.status !== 200) {
        return res.json().then((data) => {
          throw new Error(data);
        });
      } 
      return res.json();
    })
      .then((data) => {
        // setRentData(data);
        toast.success(data.toString());
        // console.log(datas);
      })
      .catch((error) => {
        toast.error(error.toString());
      });
  };


  

  useEffect(() => {
    fetch("https://localhost:7116/api/CarRent", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((res) => {
      if (res.status === 400 || res.status === 401 || res.status === 402 || res.status !== 200) {
        return res.json().then((data) => {
          throw new Error(data);
        });
      } 
      return res.json();
    })
      .then((data) => {
        setRentData(data);
        // console.log(datas);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [handleAccept, handleReject]);

  

  return (
    <>
      <Helmet>
        <title> Manage Rents | Car Rental </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Manage Rents
          </Typography>
        </Stack>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Rent Date From</TableCell>
                <TableCell align="right">Rent Date To</TableCell>
                <TableCell align="right">Car Name</TableCell>
                <TableCell align="right">Customer Name</TableCell>
                <TableCell align="right">Approved By</TableCell>
                <TableCell align="right">Discount</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rentData.map((data) => (
                <TableRow
                  key={data.rent_id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  {/* <TableCell component="th" scope="row">
                        {data.rent_id}
                      </TableCell> */}
                  <TableCell align="right">{data.rent_date_From}</TableCell>
                  <TableCell align="right">{data.rent_date_To}</TableCell>
                  <TableCell align="right">{data.carName}</TableCell>
                  <TableCell align="right">{data.customerName}</TableCell>
                  <TableCell align="right">{data.approvedBy}</TableCell>
                  <TableCell align="right">{data.discount}</TableCell>
                  <TableCell align="right">{data.rent_Status}</TableCell>
                  <TableCell align="right">
                    {data.rent_Status === "Pending" ? (
                      <>
                        <button
                          className="btn btn-primary btn-sm me-2"
                          onClick={() => handleAccept(data.rent_id)}
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleReject(data.rent_id)}
                        >
                          Reject
                        </button>
                      </>
                    ) : null}
                  </TableCell>
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
