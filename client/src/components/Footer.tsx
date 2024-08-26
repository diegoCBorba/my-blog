"use client";

import React from 'react';
import { TextField, Button, Box, Typography, Container, Divider } from '@mui/material';
import { Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface FormData {
  email: string;
}

export const Footer = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Aqui você pode adicionar a lógica para enviar o e-mail
  };

  return (
    <Box component="footer" sx={{ py: 6, mt: 4, maxWidth: "1680px", margin: "auto", position: "relative", bottom: "0", px: "1rem"}}>
      <Box sx={{ mb: 4, maxWidth: "400px"}}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          Inscreva-se para receber nossos blogs
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            variant="outlined"
            placeholder="Seu e-mail"
            fullWidth
            type="email"
            {...register('email', {
              required: 'E-mail é obrigatório',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Endereço de e-mail inválido',
              },
            })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
            InputProps={{
              startAdornment: <Mail color="gray" style={{ marginRight: "0.5rem"}} />,
            }}
          />
          <Button type="submit" variant="contained">
            Inscrever-se
          </Button>
        </Box>
      </Box>
      <Typography variant="body2" sx={{ textAlign: 'end', mt: 4, color: '#aaa' }}>
        © {new Date().getFullYear()} Diego Cardoso. Todos os direitos reservados.
      </Typography>
    </Box>
  );
};
