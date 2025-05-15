import { useState } from 'react';
import {
  Card,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Divider,
} from '@mui/material';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDButton from 'components/MDButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DescriptionIcon from '@mui/icons-material/Description';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import TextField from '@mui/material/TextField';
function Reportes() {
  const [reportType, setReportType] = useState('');
  const [format, setFormat] = useState('');

  const reportOptions = [
    { value: 'inventario', label: 'Reporte de Inventario' },
    { value: 'ventas', label: 'Reporte de Ventas' },
    { value: 'compras', label: 'Reporte de Compras' },
    { value: 'transferencias', label: 'Reporte de Transferencias' },
    { value: 'usuarios', label: 'Reporte de Usuarios' },
  ];

  const formatOptions = [
    { value: 'pdf', label: 'PDF', icon: <PictureAsPdfIcon /> },
    { value: 'excel', label: 'Excel', icon: <InsertDriveFileIcon /> },
    { value: 'csv', label: 'CSV', icon: <DescriptionIcon /> },
  ];

  return (
    <DashboardLayout>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
              textAlign="center"
            >
              <MDTypography variant="h4" color="white">
                Generador de Reportes
              </MDTypography>
            </MDBox>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ p: 3 }}>
              <Grid container spacing={3}>
                {/* Selección de tipo de reporte */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="report-type-label">
                      Tipo de Reporte
                    </InputLabel>
                    <Select
                      labelId="report-type-label"
                      value={reportType}
                      label="Tipo de Reporte"
                      onChange={(e) => setReportType(e.target.value)}
                      IconComponent={ArrowDropDownIcon}
                      sx={{ height: 56 }}
                    >
                      {reportOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Selección de formato */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="format-label">Formato</InputLabel>
                    <Select
                      labelId="format-label"
                      value={format}
                      label="Formato"
                      onChange={(e) => setFormat(e.target.value)}
                      IconComponent={ArrowDropDownIcon}
                      sx={{ height: 56 }}
                    >
                      {formatOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          <Box display="flex" alignItems="center" gap={1}>
                            {option.icon}
                            {option.label}
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Filtros adicionales (aparecen cuando se selecciona un reporte) */}
                {reportType && (
                  <>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        label="Fecha inicial"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        sx={{ height: 56 }}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        label="Fecha final"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        sx={{ height: 56 }}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="info"
                        size="large"
                        startIcon={<DescriptionIcon />}
                        sx={{ height: 56 }}
                      >
                        Aplicar Filtros
                      </Button>
                    </Grid>
                  </>
                )}
              </Grid>

              {/* Botón de generación */}
              <MDBox mt={4} display="flex" justifyContent="flex-end">
                <MDButton
                  variant="gradient"
                  color="info"
                  disabled={!reportType || !format}
                  size="large"
                >
                  Generar Reporte
                </MDButton>
              </MDBox>
            </Card>
          </Grid>

          {/* Vista previa del reporte (aparece cuando se genera) */}
          {false && ( // Cambiar a true cuando haya un reporte generado
            <Grid item xs={12}>
              <Card sx={{ p: 3 }}>
                <MDTypography variant="h5" mb={2}>
                  Vista Previa del Reporte
                </MDTypography>
                <Box
                  sx={{
                    minHeight: 300,
                    border: '1px dashed #ccc',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f9f9f9',
                  }}
                >
                  <Typography color="textSecondary">
                    Vista previa del reporte generado aparecerá aquí
                  </Typography>
                </Box>
                <MDBox mt={2} display="flex" justifyContent="flex-end" gap={2}>
                  <MDButton variant="outlined" color="info">
                    Descargar
                  </MDButton>
                  <MDButton variant="contained" color="info">
                    Enviar por Correo
                  </MDButton>
                </MDBox>
              </Card>
            </Grid>
          )}
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Reportes;
