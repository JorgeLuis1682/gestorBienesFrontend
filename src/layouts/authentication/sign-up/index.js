/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

// @mui material components
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';

// Authentication layout components
import CoverLayout from 'layouts/authentication/components/CoverLayout';

// Config
import config from 'config';

// Images
import bgImage from 'assets/images/bg-sign-up-cover.jpeg';

function Cover() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
    username: '',
    first_name: '',
    last_name: '',
    tipo: '',
  });

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success', // 'success' | 'error' | 'info' | 'warning'
  });

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${config.apiUrl}/user/register/`,
        formData
      );
      console.log(response);
      console.log(config.apiUrl);
      console.log('Registration successful:', response.data);

      // Mostrar notificación de éxito
      setNotification({
        open: true,
        message: '¡Registro exitoso! Redirigiendo al inicio de sesión...',
        severity: 'success',
      });

      // Esperar 2 segundos antes de redirigir
      setTimeout(() => {
        navigate('/authentication/sign-in');
      }, 2000);
    } catch (error) {
      console.error(
        'Registration error:',
        error.response?.data || error.message
      );

      // Mostrar notificación de error
      setNotification({
        open: true,
        message:
          error.response?.data?.message ||
          'Error en el registro. Por favor, intente nuevamente.',
        severity: 'error',
      });
    }
  };

  return (
    <CoverLayout image={bgImage}>
      <Card sx={{ maxWidth: 400 }}>
        <MDBox
          sx={{ marginTop: '-24%' }}
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Registrate
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Ingrese sus datos para registrarse
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Nombre de usuario"
                name="username"
                value={formData.username}
                onChange={handleChange}
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Nombre"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Apellido"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Correo electrónico"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Contraseña"
                name="password"
                value={formData.password}
                onChange={handleChange}
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Confirmar contraseña"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Tipo"
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: 'pointer', userSelect: 'none', ml: -1 }}
              >
                &nbsp;&nbsp;Acepto los&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Términos y condiciones
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton type="submit" variant="gradient" color="info" fullWidth>
                Registrarme
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Ya tienes una cuenta?{' '}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Iniciar sesión
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>

      {/* Notificación Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </CoverLayout>
  );
}

export default Cover;
