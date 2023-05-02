import { Helmet } from "react-helmet-async";
import { Container, Typography } from "@mui/material";
import { Card, Col, Row } from "antd";
import {useState, useEffect} from "react";

export default function DashboardAppPage() {

  const [totalCars, setTotalCars] = useState(0);

  useEffect(() => {
    fetch("https://localhost:7116/api/totalcars", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
              8
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Total Rents" bordered={false}>
              3
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Pending Rents" bordered={false}>
              2
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
