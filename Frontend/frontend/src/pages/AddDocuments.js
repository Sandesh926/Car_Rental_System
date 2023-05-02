import { Helmet } from 'react-helmet-async';
import { Button, Container, Stack, Typography, Card, TextField } from '@mui/material';

export default function AddDocuments() {
  return (
    <>
      <Helmet>
        <title> Document | Car Rental </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Add Driving License Or Citizenship Paper
          </Typography>
        </Stack>
        <Card style={{ padding: "20px", marginTop: "30px" }}>
        <Button variant="contained">
            Add Document
          </Button>
        </Card>
      </Container>
    </>
  );
}