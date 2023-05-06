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
import License from "../images/Driving License.png"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddDocuments() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const data = window.localStorage.getItem("token");
  const obj = JSON.parse(data);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!selectedFile) {
      toast.error("Please upload your document!")
      return
    }

    const formData = new FormData();
    formData.append("documentFile", selectedFile);
    fetch("https://localhost:7116/api/Customers/document", {
      method: "POST",
      headers: {

        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'multipart/form-data',
        "Content-Type": "application/json",
        Accept: "application/json",
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
        toast.success("Document added successfully!")
      })
      .catch((error) => {
        // console.log(error);
        toast.error("You already have uploaded document!");
      });
    // console.log(selectedFile);
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
            <button type="submit" className="btn btn-primary" style={{ marginTop: "1vw" }}>Add Document</button>
          </form>
        </Card>
        {/* <Card style={{ padding: "20px", marginTop: "30px" }}>
          <img src={License} style={{ height: "20vw" }} />
        </Card> */}
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
