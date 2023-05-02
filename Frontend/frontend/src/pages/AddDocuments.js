import { Helmet } from "react-helmet-async";
import {
  Button,
  Container,
  Stack,
  Typography,
  Card,
  TextField,
} from "@mui/material";
import { useState } from "react";

export default function AddDocuments() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  
  const data = window.localStorage.getItem("token");
  const obj = JSON.parse(data);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("documentFile", selectedFile);
    fetch("https://localhost:7116/api/Customers/document", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${obj.token}`,
      },
      body: formData,
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
        console.log(data);
        alert("Document added successfully!")
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
    console.log(selectedFile);
  };

  return (
    <>
      <Helmet>
        <title> Document | Car Rental </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Add Driving License Or Citizenship Paper
          </Typography>
        </Stack>
        <Card style={{ padding: "20px", marginTop: "30px" }}>
          <form onSubmit={handleFormSubmit}>
            <input type="file" accept=".png,.pdf" onChange={handleFileChange} className="form-control" />
            <button type="submit" className="btn btn-primary" style={{marginTop: "1vw"}}>Add Document</button>
          </form>
        </Card>
        <Card style={{ padding: "20px", marginTop: "30px" }}>
          No Data!
        </Card>
      </Container>
    </>
  );
}
