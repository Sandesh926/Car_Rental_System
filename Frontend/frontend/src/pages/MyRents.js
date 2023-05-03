import { Helmet } from "react-helmet-async";
import {
  Container,
  Stack,
  Typography,
  Table,
  Paper,
  TableHead,
  TableContainer,
  TableRow,
  TableBody,
  TableCell,
  Card,
  TextField,
} from "@mui/material";
import Iconify from "../components/iconify";
import { useState, useEffect } from "react";
import { Button, Modal } from "antd";

export default function MyRents() {
  const [rentData, setRentData] = useState([]);
  const [rentID, setRentID] = useState("");
  const [damageDate, setDamageDate] = useState("");

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

  const handleCancel = (id) => {
    fetch(`https://localhost:7116/cancel/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${obj.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // setRentData(data);
        alert("Successfully Cancled!");
        // console.log(datas);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePay = (id) => {
    const config = "744e7c5a240f401e95551a71d782da81";
    const href = window.location.href;

    fetch(`https://localhost:7116/pay/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${obj.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // setRentData(data);
        // alert("Payment Successfully!");
        // console.log(datas);
      })
      .catch((error) => {
        console.log(error);
        return;
      });

    fetch("https://a.khalti.com/api/v2/epayment/initiate/", {
      method: "POST",
      headers: {
        Authorization: "Key " + config,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        return_url: href,
        website_url: "http://localhost:3000/",
        amount: 100,
        purchase_order_id: 1,
        purchase_order_name: "Book Car",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.location.href = data.payment_url;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    fetch("https://localhost:7116/api/DamageCar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${obj.token}`
      },
      body: JSON.stringify({
        damageDate: damageDate,
        car_id: rentID
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Damage Request Submitted!");
        // form.current.reset();
      })
      .catch((error) => {
        console.log(error);
      });
    setIsModalOpen(false);
  };

  const handleCancels = () => {
    setIsModalOpen(false);
  };

  const handleDamage = (id) => {
    setRentID(id);
    showModal();
  };

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
                <TableCell align="right">Customer Name</TableCell>
                <TableCell align="right">Staff Name</TableCell>
                <TableCell align="right">Approved By</TableCell>
                <TableCell align="right">Rent Status</TableCell>
                <TableCell align="right">Discount</TableCell>
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
                  <TableCell align="right">{data.carName}</TableCell>
                  <TableCell align="right">{data.customerName}</TableCell>
                  <TableCell align="right">{data.staffName}</TableCell>
                  <TableCell align="right">{data.approvedBy}</TableCell>
                  <TableCell align="right">{data.rent_Status}</TableCell>
                  <TableCell align="right">{data.discount}</TableCell>
                  <TableCell align="right">
                    {data.rent_Status === "Pending" ? (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleCancel(data.rent_id)}
                      >
                        Cancel
                      </button>
                    ) : data.rent_Status === "Accepted" ? (
                      <>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => handlePay(data.rent_id)}
                        >
                          Pay
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDamage(data.car_id)}
                        >
                          Damage
                        </button>
                      </>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* <Button type="primary">
            Damage Request Form
          </Button> */}
          <Modal
            title="Damage Request Form"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancels}
          >
            <Card style={{ padding: "20px", marginTop: "30px" }}>
              <Typography variant="h6" style={{ marginBottom: "1vw" }}>
                Damage Date
              </Typography>
              <TextField
                id="outlined-basic"
                variant="outlined"
                type="date"
                fullWidth
                onChange={(e) => setDamageDate(e.target.value)}
              />
              <TextField
                id="outlined-multiline-static"
                label="Damage Description"
                fullWidth
                multiline
                rows={4}
                style={{ marginTop: "2vw" }}
              />
            </Card>
          </Modal>
        </TableContainer>
      </Container>
    </>
  );
}
