import { Container, Typography, Button, Box } from '@mui/material';

export default function NotFound() {

  return (
    <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: 8 }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h1" component="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          Oops! A página que você está procurando não existe.
        </Typography>
        <Box mt={4}>
          <Button variant="contained" color="primary">
            Voltar para a página inicial
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
