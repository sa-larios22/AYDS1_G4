import { Button, Paper, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AuthService } from '../../service/authService';

export function ModInfoPage(){
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(1);
  const auth = AuthService();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email  || !name || !lastname || !username) {
      setError("No pueden haber campos vacíos");
      return;
    }
    setError("");
    const response = await auth.updateUser(userId, name, lastname, username, email);
    if (response){
      toast.success('Datos actualizados exitosamente');
      navigate('/');
    }else{
      toast.error('Error en la actualización de datos');
    }
  };

  useEffect(() => {
      const getUser = async () => {
        const data = await auth.getUser(1);
        if (!data) {
          return;
        }
        setName(data.name);
        setLastname(data.lastname);
        setUsername(data.username);
        setEmail(data.email);
      }
      getUser();
    }, []);
  return (
    <div>
      <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column',  placeItems: 'center', margin: 'none', alignContent: 'center', justifyContent: 'center', marginTop: '20px'}}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center"}}> 
          <Paper elevation={5} sx={{padding: 2, pt: 4, pb: 3, margin: 2, maxWidth: 450}}>
            <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
              Actualización de datos
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

              {error && <Typography color="error" sx={{mt: 2}}>{error}</Typography>}
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, backgroundColor: 'black'}}>
                Actualizar
              </Button>
            </form>
          </Paper> 
        </Box>
      </Container>
    </div>
  );
}