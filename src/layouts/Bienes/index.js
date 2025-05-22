import Card from '@mui/material/Card';
import React, { useState, useRef, useEffect } from 'react';
import axiosInstance from '../../config/axiosConfig';
import {
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormGroup,
  FormControlLabel,
  Checkbox,
  IconButton,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import CloseIcon from '@mui/icons-material/Close';

function BienesView() {
  const [unidadTrabajo, setUnidadTrabajo] = useState('');
  const [unidadTrabajoOptions, setUnidadTrabajoOptions] = useState([
    'Administración',
    'Producción',
    'Logística',
    'Control de calidad',
    'Mantenimiento',
  ]);
  const [unidadTrabajoSelected, setUnidadTrabajoSelected] = useState('');
  const [unidadTrabajoOpen, setUnidadTrabajoOpen] = useState(false);
  const [unidadTrabajoLoading, setUnidadTrabajoLoading] = useState(false);
  const [unidadTrabajoError, setUnidadTrabajoError] = useState(false);
  const [descripcion, setDescripcion] = useState('');
  const [descripcionError, setDescripcionError] = useState(false);
  const [ambiente, setAmbiente] = useState('');
  const [seccion, setSeccion] = useState('');
  const [subgrupo, setSubgrupo] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [openUnidadTrabajo, setOpenUnidadTrabajo] = useState(false);
  const [openAmbiente, setOpenAmbiente] = useState(false);
  const [openSeccion, setOpenSeccion] = useState(false);
  const [openSubgrupo, setOpenSubgrupo] = useState(false);
  const [openZoom, setOpenZoom] = useState(false);
  const [zoomedImage, setZoomedImage] = useState('');
  const [bienId, setBienId] = useState('');
  const [bienData, setBienData] = useState(null);
  const fileInputRef = useRef(null);

  const updateStatesFromBienData = () => {
    if(!bienData) {
      setUnidadTrabajo(bienData?.unidadTrabajo || '');
      setDescripcion(bienData?.descripcion || '');
      setAmbiente(bienData?.ambiente || '');
      setSeccion(bienData?.seccion || '');
      setSubgrupo(bienData?.subgrupo || '');
      setImages(bienData?.imagenes || []);
  }
};

  console.log(bienData)

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('Usuario no autenticado. Por favor, inicie sesión.');
      return;
    }
  }, []);

  useEffect(() => {
    updateStatesFromBienData();
  }, [bienData]);

  const handleUnidadTrabajoChange = (event) => setUnidadTrabajo(event.target.value);
  const handleAmbienteChange = (event) => setAmbiente(event.target.value);
  const handleSeccionChange = (event) => setSeccion(event.target.value);
  const handleSubgrupoChange = (event) => setSubgrupo(event.target.value);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleAddImage = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImages((prevImages) => [...prevImages, imageUrl]);
    }
    event.target.value = null;
  };

  const handleRemoveImage = () => {
    if (images.length > 0) {
      URL.revokeObjectURL(images[currentImageIndex]);
      const newImages = images.filter(
        (_, index) => index !== currentImageIndex
      );
      setImages(newImages);
      if (newImages.length > 0) {
        setCurrentImageIndex(Math.min(currentImageIndex, newImages.length - 1));
      } else {
        setCurrentImageIndex(0);
      }
    }
  };

  const handleOpenZoom = (image) => {
    setZoomedImage(image);
    setOpenZoom(true);
  };

  const handleCloseZoom = () => {
    setOpenZoom(false);
  };

  const handleSearchBien = async () => {
    if (!bienId) {
      alert('Por favor, ingrese un número de bien.');
    }

    try {
      const response = await axiosInstance.get(`http://127.0.0.1:8000/api/bienes/${bienId}/`);
      print(response.data)
      setBienData(response.data);
    } catch (error) {
      console.error('Error al buscar el bien:', error);
      alert('No se pudo obtener la información del bien. Verifique el ID.');
    }
  };

  const renderCarouselContent = () => {
    if (images.length === 0) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: 'text.secondary',
            p: 2,
          }}
        >
          <ImageNotSupportedIcon sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h6" align="center">
            No hay imagen de este bien
          </Typography>
          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            Agregue una imagen haciendo clic en el botón inferior
          </Typography>
        </Box>
      );
    } else {
      return (
        <>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '36vh',
              cursor: 'pointer',
            }}
            onClick={() => handleOpenZoom(images[currentImageIndex])}
          >
            <img
              src={images[currentImageIndex]}
              alt={`Imagen ${currentImageIndex + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                borderRadius: 4,
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderRadius: '50%',
                padding: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ZoomInIcon sx={{ color: 'white' }} />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              mt: 2,
              justifyContent: 'center',
            }}
          >
            {images.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  bgcolor:
                    currentImageIndex === index ? 'darkblue' : 'grey.400',
                  cursor: 'pointer',
                }}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </Box>
        </>
      );
    }
  };

  return (
    <DashboardLayout>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />

      <Dialog open={openZoom} onClose={handleCloseZoom} maxWidth="md" fullWidth>
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          <img
            src={zoomedImage}
            alt="Imagen ampliada"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '80vh',
              objectFit: 'contain',
            }}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button
            onClick={handleCloseZoom}
            startIcon={<CloseIcon />}
            variant="contained"
            sx={{ mb: 2 }}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          p: 3,
          gap: 2,
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <h1>Bienes</h1>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <TextField
            id="Bien"
            label="Nro de bien"
            variant="outlined"
            sx={{ width: 250, height: 56 }}
            value={bienId}
            onChange={(e) => setBienId(e.target.value)}
          />

          <Button
            title="Buscar registro de bien"
            variant="contained"
            sx={{
              width: 100,
              height: 56,
              bgcolor: 'darkblue',
              '&:hover': { bgcolor: 'navy' },
              color: '#FFFFFF',
            }}
            onClick={handleSearchBien}
          >
            <SearchIcon sx={{ color: '#FFFFFF' }} fontSize="large" />
          </Button>

          <TextField
            id="descripcion"
            label="Descripción"
            variant="outlined"
            sx={{ flexGrow: 1, height: 56 }}
            value={descripcion || ''}
            onChange={(e) =>
              setBienData((prev) => ({ ...prev, descripcion: e.target.value }))
            }
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            alignItems: 'flex-start',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: 350,
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="unidad-trabajo-select-label">
                Unidad de trabajo
              </InputLabel>
              <Select
                labelId="unidad-trabajo-select-label"
                value={unidadTrabajo}
                label="Unidad de trabajo"
                open={openUnidadTrabajo}
                onClose={() => setOpenUnidadTrabajo(false)}
                onOpen={() => setOpenUnidadTrabajo(true)}
                onChange={handleUnidadTrabajoChange}
                sx={{ height: 56 }}
                IconComponent={() =>
                  openUnidadTrabajo ? (
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
                <MenuItem value="administracion">Administración</MenuItem>
                <MenuItem value="produccion">Producción</MenuItem>
                <MenuItem value="logistica">Logística</MenuItem>
                <MenuItem value="calidad">Control de calidad</MenuItem>
                <MenuItem value="t ">Mantenimiento</MenuItem>
              </Select>
            </FormControl>

            <Card
              sx={{
                p: 2,
                backgroundColor: '#f5f5f5',
                width: '340px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: 4,
                }}
              >
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked color="primary" />}
                    label="Inspeccion"
                  />
                  <FormControlLabel
                    control={<Checkbox color="primary" />}
                    label="Inoperativo"
                  />
                  <FormControlLabel
                    control={<Checkbox color="primary" />}
                    label="Obsoleto"
                  />
                  <FormControlLabel
                    control={<Checkbox color="primary" />}
                    label="Espera factura"
                  />
                </FormGroup>

                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox color="primary" />}
                    label="Faltante"
                  />
                  <FormControlLabel
                    control={<Checkbox color="primary" />}
                    label="Deteriorado"
                  />
                  <FormControlLabel
                    control={<Checkbox color="primary" />}
                    label="Robado"
                  />
                </FormGroup>
              </Box>
            </Card>

            <Card
              sx={{
                p: 2,
                width: '340px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  backgroundColor:
                    images.length === 0 ? '#f5f5f5' : 'transparent',
                  borderRadius: 1,
                }}
              >
                {images.length > 0 && (
                  <IconButton
                    onClick={prevImage}
                    sx={{
                      position: 'absolute',
                      left: 10,
                      zIndex: 1,
                      backgroundColor: 'rgba(0,0,0,0.2)',
                      '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.4)',
                      },
                    }}
                  >
                    <ChevronLeft sx={{ color: 'white' }} />
                  </IconButton>
                )}

                {renderCarouselContent()}

                {images.length > 0 && (
                  <IconButton
                    onClick={nextImage}
                    sx={{
                      position: 'absolute',
                      right: 10,
                      zIndex: 1,
                      backgroundColor: 'rgba(0,0,0,0.2)',
                      '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.4)',
                      },
                    }}
                  >
                    <ChevronRight sx={{ color: 'white' }} />
                  </IconButton>
                )}
              </Box>
            </Card>

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'center',
              }}
            >
              <Button
                variant="contained"
                onClick={handleAddImage}
                sx={{
                  flex: 1,
                  bgcolor: 'darkblue',
                  '&:hover': { bgcolor: 'navy' },
                  color: '#FFFFFF',
                }}
              >
                Agregar imagen
              </Button>
              <Button
                variant="contained"
                onClick={handleRemoveImage}
                disabled={images.length === 0}
                sx={{
                  flex: 1,
                  bgcolor: 'error.main',
                  '&:hover': { bgcolor: 'error.dark' },
                  '&:disabled': { bgcolor: 'grey.400' },
                  color: '#FFFFFF',
                }}
              >
                Eliminar imagen
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: 380,
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="ambiente-select-label">Ambiente</InputLabel>
              <Select
                labelId="ambiente-select-label"
                value={ambiente}
                label="Ambiente"
                open={openAmbiente}
                onClose={() => setOpenAmbiente(false)}
                onOpen={() => setOpenAmbiente(true)}
                onChange={handleAmbienteChange}
                sx={{ height: 56 }}
                IconComponent={() =>
                  openAmbiente ? (
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
                <MenuItem value="oficina">Oficina</MenuItem>
                <MenuItem value="almacen">Almacén</MenuItem>
                <MenuItem value="laboratorio">Laboratorio</MenuItem>
                <MenuItem value="taller">Taller</MenuItem>
                <MenuItem value="exterior">Área exterior</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="seccion-select-label">Sección</InputLabel>
              <Select
                labelId="seccion-select-label"
                value={seccion}
                label="Sección"
                open={openSeccion}
                onClose={() => setOpenSeccion(false)}
                onOpen={() => setOpenSeccion(true)}
                onChange={handleSeccionChange}
                sx={{ height: 56 }}
                IconComponent={() =>
                  openSeccion ? (
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
                <MenuItem value="seccion1">Sección 1</MenuItem>
                <MenuItem value="seccion2">Sección 2</MenuItem>
                <MenuItem value="seccion3">Sección 3</MenuItem>
                <MenuItem value="seccion4">Sección 4</MenuItem>
              </Select>
            </FormControl>

            <Box
              sx={{
                display: 'flex',
                gap: 2,
              }}
            >
              <TextField
                size="small"
                label="Factura"
                variant="outlined"
                sx={{ flex: 1, minWidth: 180 }}
                fullWidth
              />
              <TextField
                size="small"
                label="Fecha factura"
                variant="outlined"
                sx={{ flex: 1, minWidth: 180 }}
                fullWidth
              />
              <TextField
                size="small"
                label="Inspeccion"
                variant="outlined"
                sx={{ flex: 1, minWidth: 180 }}
                fullWidth
              />
            </Box>

            <TextField
              label="Observaciones"
              variant="outlined"
              sx={{
                flexGrow: 1,
                width: 625,
                height: 70,
                '& .MuiOutlinedInput-root': {
                  height: '100%',
                },
              }}
              InputProps={{
                style: {
                  height: '100%',
                },
              }}
            />

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                mt: 2,
              }}
            >
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  size="small"
                  label="Valor (bs.s)"
                  variant="outlined"
                  sx={{ flex: 1, minWidth: 180 }}
                  fullWidth
                />
                <TextField
                  size="small"
                  label="Denuncia"
                  variant="outlined"
                  sx={{ flex: 1, minWidth: 180 }}
                  fullWidth
                />
                <TextField
                  size="small"
                  label="Fecha denuncia"
                  variant="outlined"
                  sx={{ flex: 1, minWidth: 180 }}
                  fullWidth
                />
              </Box>

              {/* Card de fechas modificada para ocupar todo el ancho */}
              <Card
                sx={{
                  p: 2,
                  backgroundColor: '#f5f5f5',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 1,
                      alignItems: 'center',
                    }}
                  >
                    <TextField
                      size="small"
                      label="Fecha incorporacion"
                      variant="outlined"
                      sx={{ flex: 1 }}
                      fullWidth
                    />
                    <Button
                      variant="contained"
                      sx={{
                        width: 100,
                        height: 40,
                        bgcolor: 'darkblue',
                        '&:hover': { bgcolor: 'navy' },
                        color: '#FFFFFF',
                      }}
                    >
                      Fecha actual
                    </Button>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      gap: 1,
                      alignItems: 'center',
                    }}
                  >
                    <TextField
                      size="small"
                      label="Fecha Desincorporacion"
                      variant="outlined"
                      sx={{ flex: 1 }}
                      fullWidth
                    />
                    <Button
                      variant="contained"
                      sx={{
                        width: 100,
                        height: 40,
                        bgcolor: 'darkblue',
                        '&:hover': { bgcolor: 'navy' },
                        color: '#FFFFFF',
                      }}
                    >
                      Fecha actual
                    </Button>
                  </Box>
                </Box>
              </Card>

              {/* Botones de acción ahora debajo de la card */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    width: 150,
                    height: 45,
                    color: 'darkblue',
                    borderColor: 'darkblue',
                    '&:hover': {
                      borderColor: 'navy',
                      backgroundColor: 'rgba(0, 0, 139, 0.04)',
                    },
                  }}
                >
                  Agregar registro
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    width: 150,
                    height: 45,
                    color: 'darkblue',
                    borderColor: 'darkblue',
                    '&:hover': {
                      borderColor: 'navy',
                      backgroundColor: 'rgba(0, 0, 139, 0.04)',
                    },
                  }}
                >
                  Actualizar registro
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    width: 150,
                    height: 45,
                    color: 'darkblue',
                    borderColor: 'darkblue',
                    '&:hover': {
                      borderColor: 'navy',
                      backgroundColor: 'rgba(0, 0, 139, 0.04)',
                    },
                  }}
                >
                  Eliminar registro
                </Button>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: 310,
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="subgrupo-select-label">Subgrupos</InputLabel>
              <Select
                labelId="subgrupo-select-label"
                value={subgrupo}
                label="Subgrupos"
                open={openSubgrupo}
                onClose={() => setOpenSubgrupo(false)}
                onOpen={() => setOpenSubgrupo(true)}
                onChange={handleSubgrupoChange}
                sx={{ height: 56 }}
                IconComponent={() =>
                  openSubgrupo ? (
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
                <MenuItem value="electronica">Electrónica</MenuItem>
                <MenuItem value="mobiliario">Mobiliario</MenuItem>
                <MenuItem value="herramientas">Herramientas</MenuItem>
                <MenuItem value="equipos">Equipos</MenuItem>
                <MenuItem value="vehiculos">Vehículos</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Asignado"
              variant="outlined"
              sx={{ height: 56 }}
              fullWidth
            />
          </Box>
        </Box>
      </Card>
    </DashboardLayout>
  );
}

export default BienesView;
