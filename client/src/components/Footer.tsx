"use client";

import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import emailjs from "@emailjs/browser"

const schema = z.object({
  name: z.string()
    .nonempty('Nome é obrigatório'),
  email: z.string()
    .email('Endereço de e-mail inválido')
    .nonempty('E-mail é obrigatório'),
  comment: z.string()
    .nonempty('Comentário é obrigatório'),
});

type FormData = z.infer<typeof schema>;

export const Footer = () => {
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    emailjs.send("service_snw1u2s", "template_4fui126", data, "dWLMojmYc4TuO9QPL")
    .then(() => {
      setAlert({ type: 'success', message: 'Email enviado com sucesso!' });
      reset();
    }, () => {
      setAlert({ type: 'error', message: 'Erro ao enviar o e-mail. Tente novamente mais tarde.' });
    });
  };

  return (
    <Box component="footer" sx={{ py: 6, mt: 4, maxWidth: "1680px", margin: "auto", position: "relative", bottom: "0", px: "1rem" }}>
      <Box id="contato" sx={{ mb: 4, maxWidth: "400px" }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          Mande alguma sugestão
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
          <TextField
            variant="outlined"
            placeholder="Seu nome"
            fullWidth
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            variant="outlined"
            placeholder="Seu comentário"
            fullWidth
            multiline
            rows={4}
            {...register('comment')}
            error={!!errors.comment}
            helperText={errors.comment?.message}
          />
          {alert && (
            <Alert severity={alert.type}>
              {alert.message}
            </Alert>
          )}
          <Button type="submit" variant="contained">
            Enviar
          </Button>
        </Box>
      </Box>
      <Typography variant="body2" sx={{ textAlign: 'end', mt: 4, color: '#aaa' }}>
        © {new Date().getFullYear()} Diego Cardoso. Todos os direitos reservados.
      </Typography>
    </Box>
  );
};
