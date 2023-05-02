import { Helmet } from 'react-helmet-async';
import { Button, Container, Stack, Typography } from '@mui/material';
import Iconify from '../components/iconify'

export default function CarDamage() {
  return (
    <>
      <Helmet>
        <title> Car Damage | Car Rental </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Car Damage
          </Typography>
        </Stack>
        
      </Container>
    </>
  );
}
