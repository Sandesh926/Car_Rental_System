import { Helmet } from 'react-helmet-async';
import { Button, Container, Stack, Typography } from '@mui/material';
import Iconify from '../components/iconify'

export default function TrackCustomer() {
  return (
    <>
      <Helmet>
        <title> Track Customer | Car Rental </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Track Customer
          </Typography>
        </Stack>
        <h1>This is a track customer page.</h1>
      </Container>
    </>
  );
}
