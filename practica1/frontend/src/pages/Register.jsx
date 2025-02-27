import { Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import { AuthService } from '../service/authService';

export function RegisterPage(){
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('client');
  const [error, setError] = useState('');
  const auth = AuthService();
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword || !name || !lastname || !username) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    setError("");
    const response = await auth.register(name, lastname, username, email, password, role);
    if (response){
      toast.success('Usuario creado exitosamente');
      navigate('/login');
    }else{
      toast.error('Error al crear usuario');
    }
  };
  return (
    <div>
      <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column',  placeItems: 'center', margin: 'none', alignContent: 'center', justifyContent: 'center', marginTop: '20px'}}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center"}}> 
          <Paper elevation={5} sx={{padding: 2, pt: 4, pb: 3, margin: 2, maxWidth: 450}}>
            <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
              Registro
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                  fullWidth
                  margin="normal"
                  label="Nombre "
                  type="text"
                  variant="outlined"
                  size="small"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Apellido "
                  type="text"
                  variant="outlined"
                  size="small"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Nombre de usuario "
                  type="text"
                  variant="outlined"
                  size="small"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
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
              <TextField
                fullWidth
                margin="normal"
                label="Confirmar contraseña"
                type="password"
                variant="outlined"
                size="small"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <FormControl fullWidth margin="normal" size="small">
                <InputLabel>Rol</InputLabel>
                <Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  label="Rol"
                >
                  {user && user.role === 'admin' &&(
                    <div>
                      <MenuItem value="admin">Administrador</MenuItem>
                      <MenuItem value="staff">Personal del Aeropuerto</MenuItem>
                    </div>
                  )}
                  <MenuItem value="client">Pasajero</MenuItem>
                </Select>
              </FormControl>

              {error && <Typography color="error" sx={{mt: 2}}>{error}</Typography>}
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, backgroundColor: 'black'}}>
                Registrarse
              </Button>
            </form>
          </Paper> 
        </Box>
      </Container>
    </div>
  );
}