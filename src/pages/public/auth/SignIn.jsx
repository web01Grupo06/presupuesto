import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import {AuthContext} from '../../../context/AuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useContext } from 'react';
import {Apiurl} from '../../../services/apiusuarios';
import { types } from '../../../types/types';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';
import Modal from '@mui/material/Modal';
import { makeStyles } from '@mui/styles';
const theme = createTheme();
const useStyles = makeStyles(() => ({
  modal: {
    position: 'absolute',
    width: 800,
    backgroundColor: 'white',
    border: '2px solid white',
    borderRadius: '5px',
    boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
    padding: '20px 20px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
}));
export default function SignIn() {
  const styles= useStyles();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [modalAccount, setModalAccount]= React.useState(false);
  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();
  const openCloseModalAccount=()=>{
    setModalAccount(!modalAccount);
  }

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  }
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  }
  const handleData = () => {
 
  }
  
  const handleSubmit = async(event) => {

    event.preventDefault();
    if ((email === "" && password === "") || email === "" || password === "") {
      Swal.fire({
        icon:'warning',
        title: 'Por favor insertar datos!',
      })
      return;
    }
    const user = {email,password}
      const response = await Axios.post(`${Apiurl}/api/auth/signin`,user);
      console.log(response)
      const mensaje = response.data.message
      if(mensaje === 'Usuario o contraseña incorrecta') {
    
        Swal.fire({
          icon:'error',
          title: mensaje,
          showConfirmButton: false,
          timer: 1500
        })
    
      }
    
      else {
        
        const token = response.data.token
        const role = response.data.role
     
        sessionStorage.setItem('token',token)
        sessionStorage.setItem('role',role)
        dispatch({
            type: types.login,
            payload: {
                name: 'Fernando'
            }
        });

        navigate( "/home" );
        
        
      }
 
   }
   const bodyAccount=(
    <div className={styles.modal}>
      <h1>Primero revisar el rol del administrador por que el de presupuestario tiene errores y podría tumbar el backend.Gracias
      </h1>
      <h2>Administrador</h2>
      <p>Correo Electrónico: admin@localhost</p>
      <p>Contraseña: admin</p>
      <br/>
      <h2>Presupuestario</h2>
      <p>Correo Electrónico: budgetary@localhost</p>
      <p>Contraseña: budgetary</p>
      <div align="right">
        <Button onClick={()=>openCloseModalAccount()}>OK</Button>

      </div>

    </div>
  );

  return (

    document.body.style = 'background: #f0f2f5',
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Paper elevation={3}>

          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <br />
            <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
              INGENIERÍA S.A.
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, padding: '0px 50px' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo Electrónico"
                name="email"
                autoComplete="email"
                autoFocus
                variant="standard"
                onChange={handleChangeEmail}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                id="standard-adornment-password"
                autoComplete="current-password"
                variant="standard"
                type="password"
                onChange={handleChangePassword}
              />
              <br />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recuérdame"
              />
              <br />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleData}
                sx={{ mt: 3, mb: 2 }}
              >
                ACCEDER
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </Grid>
                <Grid item >
                  <IconButton color="info" aria-label="accounts" onClick={() => openCloseModalAccount()}>
                    <AccountCircleIcon/>
                  </IconButton>
                </Grid>
                <br />
                <br />
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Container>
      <Modal
     open={modalAccount}
     onClose={openCloseModalAccount}>
        {bodyAccount}
     </Modal>
    </ThemeProvider>
  );
}