import { Helmet } from 'react-helmet-async';
import { Button, Container, Stack, Typography, TextField } from '@mui/material';
import Iconify from '../components/iconify'
import {useRef, useState} from "react";
import { Modal } from 'antd';


export default function CarInventory() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [carName, setCarName] = useState("");
  const [carModel, setCarModel] = useState("");
  const [year, setYear] = useState(0);
  const [color, setColor] = useState("");
  const [rentPrice, setRentPrice] = useState("");
  const [availabilityStauts, setAvailabilityStatus] = useState("");
  const [image, setImage] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (e) => {
    e.preventDefault();
    fetch("https://localhost:7116/api/Cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          car_Name: carName,
          car_Model: carModel,
          year,
          color,
          rent_Price: rentPrice,
          availability_Status: availabilityStauts,
          image
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
            console.log("Car Added!");
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

  return (
    <>
      <Helmet>
        <title> Car | Car Rental </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Car
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={showModal}>
            Add Car
          </Button>
          <Modal title="Add Car" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <form ref={form}>
          <TextField
              id="car-name"
              label="Car Name"
              variant="outlined"
              style={{marginTop: "1vw", marginRight: "1vw"}}
              onChange={(e) => setCarName(e.target.value)}
            />
            <TextField
              id="car-model"
              label="Car Model"
              variant="outlined"
              style={{marginTop: "1vw"}}
              onChange={(e) => setCarModel(e.target.value)}

            />
            <TextField
              id="year"
              label="Year"
              variant="outlined"
              type = "password"
              style={{marginTop: "1vw", marginRight: "1vw"}}
              onChange={(e) => setYear(e.target.value)}
            />
            <TextField
              id="color"
              label="Color"
              variant="outlined"
              style={{marginTop: "1vw"}}
              onChange={(e) => setColor(e.target.value)}
            />
            <TextField
              id="rent-price"
              label="Rent Price"
              variant="outlined"
              style={{marginTop: "1vw", marginRight: "1vw"}}
              onChange={(e) => setRentPrice(e.target.value)}
            />
            <TextField
              id="availability-status"
              label="Availability Status"
              variant="outlined"
              style={{marginTop: "1vw"}}
              onChange={(e) => setAvailabilityStatus(e.target.value)}
            />
            <TextField
              id="image"
              label="Image"
              variant="outlined"
              style={{marginTop: "1vw", marginRight: "1vw"}}
              onChange={(e) => setImage(e.target.value)}
            />
          </form>
          </Modal>
        </Stack>

      </Container>
    </>
  );
}
