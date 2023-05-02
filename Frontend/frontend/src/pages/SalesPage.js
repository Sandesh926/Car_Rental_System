import { Helmet } from 'react-helmet-async';
import { Button, Container, Stack, Typography, Table, TableHead, TableRow, TableCell, TableContainer, Paper } from '@mui/material';
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
        <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Sales ID</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">Car Name</TableCell>
                    <TableCell align="right">Car Model</TableCell>
                    <TableCell align="right">Total Sales</TableCell>
                    <TableCell align="right">Customer Name</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
      </Container>
    </>
  );
}
