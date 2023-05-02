import { Helmet } from 'react-helmet-async';
import { Button, Container, Stack, Typography, Card, TextField } from '@mui/material';

export default function DamageRequest() {
  return (
    <>
      <Helmet>
        <title> Damage Request | Car Rental </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Damage Request Form
          </Typography>
        </Stack>
        <Card style={{ padding: "20px", marginTop: "30px" }}>
        <Button variant="contained">
            Submit
          </Button>
        </Card>
      </Container>
    </>
  );
}