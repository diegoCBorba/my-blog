import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50', // Cor primária principal
    },
    secondary: {
      main: '#ff5722', // Cor secundária principal
    },
    success: {
      main: '#4caf50', // Cor para sucesso
    },
    error: {
      main: '#f44336', // Cor para erros
    },
    warning: {
      main: '#ff9800', // Cor para avisos
    },
    info: {
      main: '#2196f3', // Cor para informações
    },
    background: {
      default: '#f5f5f5', // Cor de fundo padrão
    },
    text: {
      primary: '#333', // Cor do texto principal
      secondary: '#666', // Cor do texto secundário
    },
  },
});
  