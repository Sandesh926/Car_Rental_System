import { Helmet } from "react-helmet-async";
import {
  Button,
  Container,
  Stack,
  Typography,
  Card,
  TextField,
  TableCell,
  TableHead,
  TableRow,
  Table,
  Paper,
  TableContainer,
  TableBody
} from "@mui/material";
import {useState, useEffect} from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DamageRequest() {

  const [damageData, setDamageData] = useState([])

  const data = window.localStorage.getItem("token");
  const obj = JSON.parse(data);

  useEffect(() => {
    fetch("https://localhost:7116/api/DamageCar/getDamageCarsByCustomer", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${obj.token}`,
      },
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
        setDamageData(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.toString())
      });
  }, []);

  return (
    <>
      <Helmet>
        <title> Damage Request | Car Rental </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Manage Damage
          </Typography>
        </Stack>
        <Card style={{ padding: "20px", marginTop: "30px" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {/* <TableCell>Car ID</TableCell> */}
                <TableCell align="right">Car Name</TableCell>
                <TableCell align="right">Customer Name</TableCell>
                <TableCell align="right">Charge Status</TableCell>
                <TableCell align="right">Damage Date</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {damageData.map((data) => (
                <TableRow
                  key={data.car_id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell align="right">{data.carName}</TableCell>
                  <TableCell align="right">{data.customerName}</TableCell>
                  <TableCell align="right">{data.charge_status}</TableCell>
                  <TableCell align="right">{data.damageDate}</TableCell>
                  <TableCell align="right">{(data.charge_status == "Pending") ? <button className="btn btn-success btn-sm">Pay</button> : null}</TableCell>
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
