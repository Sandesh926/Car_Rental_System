import { Helmet } from 'react-helmet-async';
import { Button, Container, Stack, Typography, TextField, Card, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import Iconify from '../components/iconify'
import {useRef, useState, useEffect} from "react";
import { Modal } from 'antd';


export default function CarInventory() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [carName, setCarName] = useState("");
  const [carModel, setCarModel] = useState("");
  const [year, setYear] = useState(0);
  const [color, setColor] = useState("");
  const [rentPrice, setRentPrice] = useState("");
  const [availabilityStauts, setAvailabilityStatus] = useState("");
  const [imageLink, setImageLink] = useState("")
  
  const [datas, setDatas] = useState([])

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
          // availability_Status: availabilityStauts,
          imageLink
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
        console.log(datas);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`https://localhost:7116/api/Cars/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Car Deleted!");
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
            {/* <TextField
              id="availability-status"
              label="Availability Status"
              variant="outlined"
              style={{marginTop: "1vw"}}
              onChange={(e) => setAvailabilityStatus(e.target.value)}
            /> */}
            <TextField
              id="image-link"
              label="Image Link"
              variant="outlined"
              style={{marginTop: "1vw"}}
              onChange={(e) => setImageLink(e.target.value)}
            />
          </form>
          </Modal>
        </Stack>
        <Card>
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
                  {datas.map((data) => (
                    <TableRow
                      key={data.car_id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      {/* <TableCell component="th" scope="row">
                        {data.car_id}
                      </TableCell> */}
                      <TableCell align="right">{data.car_Name}</TableCell>
                      <TableCell align="right">{data.car_Model}</TableCell>
                      <TableCell align="right">{data.year}</TableCell>
                      <TableCell align="right">{data.color}</TableCell>
                      <TableCell align="right">Rs. {data.rent_Price}</TableCell>
                      <TableCell align="right">{data.availability_Status}</TableCell>
                      <TableCell align="right"><button class="btn btn-primary btn-sm" style={{marginRight: "1vw"}}>Edit</button><button class="btn btn-danger btn-sm" onClick={() => handleDelete(data.car_id)}>Delete</button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        </Card>
      </Container>
    </>
  );
}
