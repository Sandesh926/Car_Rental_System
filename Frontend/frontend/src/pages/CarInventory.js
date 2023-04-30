import { Helmet } from 'react-helmet-async';
import { Button, Container, Stack, Typography } from '@mui/material';
import Iconify from '../components/iconify'

export default function CarInventory() {
  return (
    <>
      <Helmet>
        <title> Car | Car Rental </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Car Inventory
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Add Car
          </Button>
        </Stack>
        <h1>This is a car inventory page.</h1>
      </Container>
    </>
  );
}
