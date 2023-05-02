import { Helmet } from "react-helmet-async";
import {
  Button,
  Container,
  Stack,
  Typography,
  Card,
  TextField,
} from "@mui/material";

export default function DamageRequest() {
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
            Damage Request Form
          </Typography>
        </Stack>
        <Card style={{ padding: "20px", marginTop: "30px" }}>
          <Typography variant="h6" style={{ marginBottom: "1vw" }}>
            Damage Date
          </Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="date"
            fullWidth
          />
          <TextField
          id="outlined-multiline-static"
          label="Damage Description"
          fullWidth
          multiline
          rows={4}
          style={{marginTop: "2vw"}}
        />
          <Button variant="contained" style={{ marginTop: "1vw" }}>
            Submit
          </Button>
        </Card>
      </Container>
    </>
  );
}
