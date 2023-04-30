import { Helmet } from 'react-helmet-async';
import { Button, Container, Stack, Typography } from '@mui/material';
import Iconify from '../components/iconify'

export default function ReturnCar() {
  return (
    <>
      <Helmet>
        <title> Return Car | Car Rental </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Return Car
          </Typography>
        </Stack>
        <h1>This is a return cars page.</h1>
      </Container>
    </>
  );
}
