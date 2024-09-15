"use client";

import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegister} from '@/hooks/auth/useRegister';
import { useRouter } from 'next/navigation';

const signupSchema = z.object({
  name: z.string().nonempty('Nome é obrigatório'),
  username: z.string().min(3, 'Nome de usuário deve ter pelo menos 3 caracteres').nonempty('Nome de usuário é obrigatório'),
  email: z.string().email('Email inválido').nonempty('Email é obrigatório'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres').nonempty('Senha é obrigatória'),
  confirmPassword: z.string().min(6, 'Confirmação de senha deve ter pelo menos 6 caracteres').nonempty('Confirmação de senha é obrigatória'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

type SignupFormInputs = z.infer<typeof signupSchema>;

const SignupPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
  });

  const router = useRouter();
  const { mutate, isPending, isError, error } = useRegister();

  const onSubmit = (data: SignupFormInputs) => {
    const { confirmPassword, ...registerData } = data;
    mutate(registerData, {
      onSuccess: () => {
        router.push('/auth/login');
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
        <Typography variant="h5">Cadastre-se</Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1 }}
        >
          <TextField
            {...register('name')}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nome"
            name="name"
            autoComplete="name"
            autoFocus
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            {...register('username')}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Nome de Usuário"
            name="username"
            autoComplete="username"
            error={!!errors.username}
            helperText={errors.username?.message}
          />
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
            autoComplete="new-password"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            {...register('confirmPassword')}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirme sua Senha"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />

          {isError && (
            <Typography color="error">
              {error instanceof Error ? error.message : 'Erro ao registrar'}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={isPending}
          >
            {isPending ? 'Cadastrando...' : 'Cadastre-se'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignupPage;
