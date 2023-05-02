import { Helmet } from "react-helmet-async";
import { Container, Stack, Typography, Card } from "@mui/material";
import Car from "../images/Default-Car.PNG";
import { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import { DatePicker, Space } from "antd";

export default function RentCars() {
  const { RangePicker } = DatePicker;

  const [datas, setDatas] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
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
        console.log(datas);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
                src={Car}
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
                <Button type="primary" onClick={showModal}>
                  Rent
                </Button>
                <Modal
                  title="Rent Car"
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <Space direction="vertical" size={12}>
                    <RangePicker />
                  </Space>
                </Modal>
              </div>
            </div>
          </Card>
        ))}
      </Container>
    </>
  );
}
