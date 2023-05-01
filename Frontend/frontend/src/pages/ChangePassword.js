import { Helmet } from 'react-helmet-async';
import { Button, Container, Stack, Typography, Card, TextField } from '@mui/material';
import Iconify from '../components/iconify'

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> Change Password | Car Rental </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Change Password
          </Typography>
        </Stack>
        <Card style={{ padding: "20px", marginTop: "30px" }}>
        <TextField fullWidth id="old-password" label="Old Password" variant="outlined" style={{marginBottom: '2vw'}} />
        <TextField fullWidth id="new-password" label="New Password" variant="outlined" style={{marginBottom: '2vw'}}  />
        <TextField fullWidth id="confirm-password" label="Confirm Password" variant="outlined" style={{marginBottom: '2vw'}}  />
        <Button variant="contained">
            Change Password
          </Button>
        </Card>
      </Container>
    </>
  );
}