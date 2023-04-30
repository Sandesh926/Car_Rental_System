import { Helmet } from 'react-helmet-async';
import { Button, Container, Stack, Typography } from '@mui/material';
import Iconify from '../components/iconify'

export default function RentedCars() {
  return (
    <>
      <Helmet>
        <title> Sales | Car Rental </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Total Sales
          </Typography>
        </Stack>
        <h1>This is a sales page.</h1>
      </Container>
    </>
  );
}
