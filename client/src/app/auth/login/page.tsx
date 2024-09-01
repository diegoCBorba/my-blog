"use client";

import { Container, TextField, Button, Typography, Box, Link } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useLogin from '@/hooks/auth/useLogin'; 
import { useRouter } from 'next/navigation'; // Importando useRouter
import { useAuth } from '@/contexts/AuthContext';

// Definindo o esquema de validação com Zod
const loginSchema = z.object({
  email: z.string().email('Email inválido').nonempty('Email é obrigatório'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres').nonempty('Senha é obrigatória'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const { setAuthInfo } = useAuth()

  const { mutate: login, isPending, isError } = useLogin();
  const router = useRouter();

  const onSubmit = (data: LoginFormInputs) => {
    login(data, {
      onSuccess: (response) => {
        setAuthInfo({
          isAdmin: response.isAdmin,
          username: response.username,
          id: response.id,
          isLogged: true,
        });
        router.push('/');
      },
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
        }}
      >
        <Typography variant="h5">Entrar</Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1 }}
        >
          <TextField
            {...register('email')}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            {...register('password')}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={isPending}
          >
            {isPending ? 'Entrando...' : 'Entrar'}
          </Button>
          {isError && <Typography color="error" align='center'>Falha ao fazer login: e-mail ou senha errados</Typography>}
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              Não tem uma conta?{' '}
              <Link href="/cadastro" variant="body2" color="primary">
                Cadastre-se
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
