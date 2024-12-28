import { useRouter } from "next/router";
import { TextField, Button, Container } from "@mui/material";
import { useAuth } from "@/context/Auth-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/loginSchema";
import { ILogin } from "../../../Types/types";
import { useLogin } from "../../../services/mutate";

const LoginPage = () => {
  const { login } = useAuth();
  const { loginMutation, loading, error } = useLogin();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: ILogin) => {
    loginMutation.mutate({ email: data.email, password: data.password });
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
        />
        <TextField
          label="Senha"
          type="password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
        />
        {error && <div>{error}</div>}
        <Button type="submit" variant="contained" disabled={loading}>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default LoginPage;
