import { Helmet } from 'react-helmet-async';
import { Button, Container, Stack, Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell } from '@mui/material';
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
        <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Car ID</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">Car Name</TableCell>
                    <TableCell align="right">Car Model</TableCell>
                    <TableCell align="right">Return Date</TableCell>
                    <TableCell align="right">Customer Name</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
      </Container>
    </>
  );
}
