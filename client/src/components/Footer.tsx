"use client";

import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Definindo o esquema de validação com Zod
const schema = z.object({
  email: z.string()
    .email('Endereço de e-mail inválido')
    .nonempty('E-mail é obrigatório'),
});

type FormData = z.infer<typeof schema>;

export const Footer = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Aqui você pode adicionar a lógica para enviar o e-mail
  };

  return (
    <Box component="footer" sx={{ py: 6, mt: 4, maxWidth: "1680px", margin: "auto", position: "relative", bottom: "0", px: "1rem" }}>
      <Box id="contato" sx={{ mb: 4, maxWidth: "400px" }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          Inscreva-se para receber nossos blogs
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            variant="outlined"
            placeholder="Seu e-mail"
            fullWidth
            type="email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            InputProps={{
              startAdornment: <Mail color="gray" style={{ marginRight: "0.5rem" }} />,
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
