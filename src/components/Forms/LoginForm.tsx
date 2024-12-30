import { IUser } from "@/@types/types";
import { useAuth } from "@/context/AuthContext.";
import { loginSchema } from "@/schemas/loginSchema";
import { useLoginUser } from "@/services/mutate";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Container, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

export default function LoginForm() {
    const { logout } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm<IUser>({
        resolver: zodResolver(loginSchema),
    });

    const { loginUserMutation, loading } = useLoginUser();

    const onSubmit = (data: IUser) => {
        loginUserMutation.mutate(data);
    }

    return (
        <Container
            style={{
                backgroundColor: '#f5f5f5',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                width: '300px',
                margin: 'auto',
                marginTop: '50px'
            }}
        >
            <form
                onSubmit={handleSubmit(onSubmit)} 
                style={{
                    width: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '10px' 
                }}
            >
                <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    {...register('email')}
                    error={!!errors?.email}
                    helperText={errors?.email?.message}
                    style={{
                        width: '100%'
                    }}
                />
                <TextField
                    id="password"
                    label="Senha"
                    variant="outlined"
                    type="password"
                    {...register('password')}
                    error={!!errors?.password}
                    helperText={errors?.password?.message}
                    style={{
                        width: '100%'
                    }}
                />
                <Button 
                    type="submit" 
                    variant="contained"
                    disabled={loading}
                    style={{
                        width: '100%'
                    }}
                >
                    Entrar
                </Button>
                <Button onClick={logout}>
                    Logout
                </Button>
            </form>
        </Container>
    )
}