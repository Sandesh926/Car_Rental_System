import { Helmet } from 'react-helmet-async';
import { Button, Container, Stack, Typography, Table, Paper, TableHead, TableCell, TableRow, TableContainer } from '@mui/material';
import Iconify from '../components/iconify'

export default function RentedCars() {
  return (
    <>
      <Helmet>
        <title> Rented Cars | Car Rental </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Rented Cars
          </Typography>
        </Stack>
        <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Car ID</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">Car Name</TableCell>
                    <TableCell align="right">Car Model</TableCell>
                    <TableCell align="right">Rent Date</TableCell>
                    <TableCell align="right">Approved Staff</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
      </Container>
    </>
  );
}
