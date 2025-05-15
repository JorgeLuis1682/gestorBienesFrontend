/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================
*/

import { useState } from 'react';
import Card from '@mui/material/Card';
import {
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

function Transferencias() {
  const [openOrigen, setOpenOrigen] = useState(false);
  const [openDestino, setOpenDestino] = useState(false);
  const [openUnidadDestino, setOpenUnidadDestino] = useState(false);
  const [openAmbienteDestino, setOpenAmbienteDestino] = useState(false);

  return (
    <DashboardLayout>
      <MDBox mt={6} mb={3}>
        <Card
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            p: 3,
            gap: 2,
          }}
        >
          <MDBox sx={{ textAlign: 'center' }}>
            <MDTypography variant="h3">Transferencias</MDTypography>
          </MDBox>

          <MDBox
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <TextField
              id="transferencia"
              label="Nro de transferencia"
              variant="outlined"
              sx={{ width: 250, height: 56 }}
            />

            <Button
              variant="contained"
              sx={{
                width: 100,
                height: 56,
                bgcolor: 'darkblue',
                '&:hover': { bgcolor: 'navy' },
                color: '#FFFFFF',
              }}
            >
              <SearchIcon sx={{ color: '#FFFFFF' }} fontSize="large" />
            </Button>

            <TextField
              id="descripcion"
              label="Descripción"
              variant="outlined"
              sx={{ flexGrow: 1, height: 56 }}
            />
          </MDBox>

          <MDBox
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              alignItems: 'flex-start',
            }}
          >
            <MDBox
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: 350,
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="origen-label">
                  Unidad de trabajo actual
                </InputLabel>
                <Select
                  labelId="origen-label"
                  label="Unidad de trabajo actual"
                  sx={{ height: 56 }}
                  open={openOrigen}
                  onClose={() => setOpenOrigen(false)}
                  onOpen={() => setOpenOrigen(true)}
                  IconComponent={() =>
                    openOrigen ? (
                      <ArrowDropUpIcon
                        sx={{ color: 'text.primary', mr: 3, fontSize: '2rem' }}
                      />
                    ) : (
                      <ArrowDropDownIcon
                        sx={{ color: 'text.primary', mr: 3, fontSize: '2rem' }}
                      />
                    )
                  }
                >
                  <MenuItem value="almacen1">Almacén Principal</MenuItem>
                  <MenuItem value="almacen2">Almacén Secundario</MenuItem>
                  <MenuItem value="oficina">Oficina</MenuItem>
                </Select>
              </FormControl>

              {/* Sección "Transferir a" */}
              <MDTypography variant="h6" sx={{ textAlign: 'center', my: 1 }}>
                Transferir a
              </MDTypography>

              <FormControl fullWidth>
                <InputLabel id="unidad-destino-label">
                  Unidad de trabajo destino
                </InputLabel>
                <Select
                  labelId="unidad-destino-label"
                  label="Unidad de trabajo destino"
                  sx={{ height: 56 }}
                  open={openUnidadDestino}
                  onClose={() => setOpenUnidadDestino(false)}
                  onOpen={() => setOpenUnidadDestino(true)}
                  IconComponent={() =>
                    openUnidadDestino ? (
                      <ArrowDropUpIcon
                        sx={{ color: 'text.primary', mr: 3, fontSize: '2rem' }}
                      />
                    ) : (
                      <ArrowDropDownIcon
                        sx={{ color: 'text.primary', mr: 3, fontSize: '2rem' }}
                      />
                    )
                  }
                >
                  <MenuItem value="almacen1">Almacén Principal</MenuItem>
                  <MenuItem value="almacen2">Almacén Secundario</MenuItem>
                  <MenuItem value="oficina">Oficina</MenuItem>
                </Select>
              </FormControl>
            </MDBox>

            <MDBox
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: 350,
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="destino-label">Ambiente actual</InputLabel>
                <Select
                  labelId="destino-label"
                  label="Ambiente actual"
                  sx={{ height: 56 }}
                  open={openDestino}
                  onClose={() => setOpenDestino(false)}
                  onOpen={() => setOpenDestino(true)}
                  IconComponent={() =>
                    openDestino ? (
                      <ArrowDropUpIcon
                        sx={{ color: 'text.primary', mr: 3, fontSize: '2rem' }}
                      />
                    ) : (
                      <ArrowDropDownIcon
                        sx={{ color: 'text.primary', mr: 3, fontSize: '2rem' }}
                      />
                    )
                  }
                >
                  <MenuItem value="almacen1">Almacén Principal</MenuItem>
                  <MenuItem value="almacen2">Almacén Secundario</MenuItem>
                  <MenuItem value="oficina">Oficina</MenuItem>
                </Select>
              </FormControl>

              {/* Espacio para alinear con la sección "Transferir a" */}
              <MDTypography
                variant="h6"
                sx={{ textAlign: 'center', my: 1, visibility: 'hidden' }}
              >
                Transferir a
              </MDTypography>

              <FormControl fullWidth>
                <InputLabel id="ambiente-destino-label">
                  Ambiente destino
                </InputLabel>
                <Select
                  labelId="ambiente-destino-label"
                  label="Ambiente destino"
                  sx={{ height: 56 }}
                  open={openAmbienteDestino}
                  onClose={() => setOpenAmbienteDestino(false)}
                  onOpen={() => setOpenAmbienteDestino(true)}
                  IconComponent={() =>
                    openAmbienteDestino ? (
                      <ArrowDropUpIcon
                        sx={{ color: 'text.primary', mr: 3, fontSize: '2rem' }}
                      />
                    ) : (
                      <ArrowDropDownIcon
                        sx={{ color: 'text.primary', mr: 3, fontSize: '2rem' }}
                      />
                    )
                  }
                >
                  <MenuItem value="almacen1">Almacén Principal</MenuItem>
                  <MenuItem value="almacen2">Almacén Secundario</MenuItem>
                  <MenuItem value="oficina">Oficina</MenuItem>
                </Select>
              </FormControl>
            </MDBox>

            <MDBox
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: 350,
              }}
            >
              <TextField
                label="Fecha Transferencia"
                variant="outlined"
                sx={{ height: 56 }}
                fullWidth
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  sx={{
                    flex: 1,
                    bgcolor: 'darkblue',
                    '&:hover': { bgcolor: 'navy' },
                    color: '#FFFFFF',
                    height: 56,
                  }}
                >
                  Agregar
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    flex: 1,
                    bgcolor: 'darkblue',
                    '&:hover': { bgcolor: 'navy' },
                    color: '#FFFFFF',
                    height: 56,
                  }}
                >
                  Guardar
                </Button>
              </Box>
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default Transferencias;
