import { Helmet } from 'react-helmet-async';
import { Button, Container, Stack, Typography } from '@mui/material';
import Iconify from '../components/iconify'

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Blog | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Blog
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Post
          </Button>
        </Stack>
        <h1>This is a blog page.</h1>
      </Container>
    </>
  );
}
