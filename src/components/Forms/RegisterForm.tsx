import { Button, Container, TextField } from "@mui/material";
import { IUser } from "../../@types/types";
import { useForm } from "react-hook-form";
import { userSchema } from "@/schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useCreateUser from "../../../services/mutate";

export default function RegisterForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<IUser>({
        resolver: zodResolver(userSchema),
    });

    const { createUserMutation, loading } = useCreateUser();

    const onSubmit = (data: IUser) => {
        createUserMutation.mutate(data);
    };

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
                    id="name"
                    label="Nome"
                    variant="outlined"
                    {...register('name')}
                    error={!!errors?.name}
                    helperText={errors?.name?.message}
                    style={{
                        width: '100%'
                    }}
                />
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
                    Cadastrar
                </Button>
            </form>
        </Container>
    )
}
