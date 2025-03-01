import { Button, Paper, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../../hooks'

export function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { startLogin } = useAuth();
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }
    setError("");
    if (error === '') {
      await startLogin({ email, password });
      toast.success('Inicio de sesión exitoso');
      navigate('/dashboard');
    }else{
      toast.error('Credenciales incorrectas');
    }
  };
  return (
    <div>
      <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column',  placeItems: 'center', margin: 'none', alignContent: 'center', justifyContent: 'center', marginTop: '20px'}}>
        {/* <Toaster /> */}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center"}}> 
          <Paper elevation={5} sx={{padding: 2, pt: 4, pb: 3, margin: 2, maxWidth: 450}}>
            <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
              Iniciar Sesión
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="Correo Electrónico"
                type="email"
                variant="outlined"
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Contraseña"
                type="password"
                variant="outlined"
                size="small"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <Typography color="error">{error}</Typography>}
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, backgroundColor: 'black'}}>
                Iniciar Sesión
              </Button>
            </form>
            <div>
              <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                ¿No tienes cuenta? 
                <span 
                style={{textDecoration: 'underline', color: 'blue', cursor: 'pointer'}}
                onClick={() => navigate('/auth/register')}
                >Regístrate</span>
              </Typography>
            </div>
          </Paper> 
        </Box>
      </Container>
    </div>
  );
}