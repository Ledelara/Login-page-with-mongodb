import { Button, Container, TextField } from "@mui/material";
import { IUser } from "../../../Types/types";

interface RegisterFormProps {
    values: IUser;
    disabled?: boolean;
    onSubmit: (e: React.FormEvent) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RegisterForm(props: RegisterFormProps) {
    const { values, onSubmit, onChange, disabled } = props;

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
                onSubmit={onSubmit} 
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
                    value={values.name}
                    onChange={onChange}
                    name="name"
                    style={{
                        width: '100%'
                    }}
                />
                <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    value={values.email}
                    onChange={onChange}
                    name="email"
                    style={{
                        width: '100%'
                    }}
                />
                <TextField
                    id="password"
                    label="Senha"
                    variant="outlined"
                    value={values.password}
                    onChange={onChange}
                    name="password"
                    style={{
                        width: '100%'
                    }}
                />
                <Button 
                    type="submit" 
                    variant="contained"
                    disabled={disabled}
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
