import { Helmet } from "react-helmet-async";
import {
  Container,
  Stack,
  Typography,
  Card,
  TextField,
  Label,
} from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { Button, Modal } from "antd";

export default function RentCars() {
  const [datas, setDatas] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  console.log(startDate);
  console.log(endDate);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    RentCar();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetch("https://localhost:7116/api/Cars", {
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
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const data = window.localStorage.getItem("token");
  const obj = JSON.parse(data);

  console.log(obj.token)

  const useType = window.localStorage.getItem("role");

  const isStaff = window.localStorage.getItem("staffloggedIn");

  const [carID, setCarID] = useState("");

  console.log(startDate)
  console.log(endDate)

  console.log(carID)

  const RentCar = () => {
    fetch("https://localhost:7116/api/CarRent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${obj.token}`,
      },
      body: JSON.stringify({
        Rent_date_From: startDate,
        Rent_date_To: endDate,
        Car_id: carID,
        User_Type: useType,
      }),
    })
      .then((res) => {
        if (res.status === 400 || res.status === 401 || res.status === 402) {
          return res.json().then((data) => {
            throw new Error(data);
          });
        } 
        return res.json();
      })
      .then((data) => {
        alert("Car rented successfully");
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  const handleRentClick = useCallback((id) => {
    showModal();
    setCarID(id);
    console.log(carID);
  }, [showModal]);

  return (
    <>
      <Helmet>
        <title> Rent Car | Car Rental </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Rent a car
          </Typography>
        </Stack>
        {datas.map((data) => (
          <Card style={{ padding: "20px", marginTop: "30px" }}>
            <div class="card">
              <img
                src={data.imageLink}
                class="card-img-top"
                style={{ width: "30vw", height: "30vw" }}
              />
              <div class="card-body">
                <h5 class="card-title">
                  {data.car_Name} {data.car_Model}
                </h5>
                <p class="card-text">
                  Year: {data.year}
                  <br />
                  Color: {data.color}
                  <br />
                  Rent Price: Rs. {data.rent_Price}
                  <br />
                  Status: {data.availability_Status}
                </p>
                <Button
                  type="primary"
                  onClick={() => handleRentClick(data.car_id)}
                >
                  Rent
                </Button>
                <Modal
                  title="Rent Car"
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <Typography variant="h6" style={{ marginTop: "1vw" }}>
                    Start Date
                  </Typography>
                  <TextField
                    id="start-date"
                    type="date"
                    variant="outlined"
                    style={{ marginTop: "1vw", marginRight: "1vw" }}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <Typography variant="h6" style={{ marginTop: "1vw" }}>
                    End Date
                  </Typography>
                  <TextField
                    id="end-date"
                    type="date"
                    variant="outlined"
                    style={{ marginTop: "1vw", marginRight: "1vw" }}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </Modal>
              </div>
            </div>
          </Card>
        ))}
      </Container>
    </>
  );
}
