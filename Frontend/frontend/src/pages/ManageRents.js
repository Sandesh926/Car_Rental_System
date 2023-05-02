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

export default function ManageRents() {
  const [rentData, setRentData] = useState([]);
  const [carID, setCarID] = useState("");

  useEffect(() => {
    fetch("https://localhost:7116/api/CarRent", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
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

  const handleAccept = (id) => {
    fetch(`https://localhost:7116/accept/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // setRentData(data);
        alert(data);
        // console.log(datas);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleReject = (id) => {
    fetch(`https://localhost:7116/reject/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // setRentData(data);
        alert(data);
        // console.log(datas);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      </Container>
    </>
  );
}
