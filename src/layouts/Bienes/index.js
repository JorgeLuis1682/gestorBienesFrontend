import Card from "@mui/material/Card";
import React, { useState } from "react";
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
  Checkbox
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

function BienesView() {
    // Estados para los selects
    const [unidadTrabajo, setUnidadTrabajo] = useState("");
    const [ambiente, setAmbiente] = useState("");
    const [subgrupo, setSubgrupo] = useState("");
    
    // Estados para controlar la apertura de los selects
    const [openUnidadTrabajo, setOpenUnidadTrabajo] = useState(false);
    const [openAmbiente, setOpenAmbiente] = useState(false);
    const [openSubgrupo, setOpenSubgrupo] = useState(false);

    // Manejadores de cambios
    const handleUnidadTrabajoChange = (event) => setUnidadTrabajo(event.target.value);
    const handleAmbienteChange = (event) => setAmbiente(event.target.value);
    const handleSubgrupoChange = (event) => setSubgrupo(event.target.value);

    return (
        <DashboardLayout>
            <Card sx={{ 
                height: "100%", 
                display: "flex", 
                flexDirection: "column", 
                p: 3,
                gap: 2
            }}>
                {/* Título */}
                <Box sx={{ textAlign: "center" }}>
                    <h1>Bienes</h1>
                </Box>
                
                {/* Fila de búsqueda */}
                <Box sx={{ 
                    display: "flex", 
                    flexDirection: "row", 
                    gap: 2,
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <TextField 
                        id="Bien" 
                        label="Nro de bien" 
                        variant="outlined" 
                        sx={{ width: 250, height: 56 }} 
                    />
                    
                    <Button 
                        title="Buscar registro de bien" 
                        variant="contained" 
                        sx={{ 
                            width: 100, 
                            height: 56, 
                            bgcolor: "darkblue", 
                            "&:hover": { bgcolor: "navy" }
                        }}
                    >
                        <SearchIcon sx={{ color: "#FFFFFF" }} fontSize="large" />
                    </Button>
                    
                    <TextField 
                        id="descripcion" 
                        label="Descripción" 
                        variant="outlined" 
                        sx={{ flexGrow: 1, height: 56 }} 
                    />
                </Box>

                {/* Fila de selects (Unidad de trabajo, Ambiente, Subgrupos) */}
                <Box sx={{ 
                    display: "flex", 
                    flexDirection: "row", 
                    gap: 2,
                    alignItems: "flex-start"
                }}>
                    {/* Columna 1: Select Unidad de trabajo + Checkboxes */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 310 }}>
                        <FormControl fullWidth>
                            <InputLabel id="unidad-trabajo-select-label">Unidad de trabajo</InputLabel>
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
                                        <ArrowDropUpIcon sx={{ color: 'text.primary', mr: 3, fontSize: '2rem' }} />
                                    ) : (
                                        <ArrowDropDownIcon sx={{ color: 'text.primary', mr: 3, fontSize: '2rem' }} />
                                    )
                                }
                            >
                                <MenuItem value="administracion">Administración</MenuItem>
                                <MenuItem value="produccion">Producción</MenuItem>
                                <MenuItem value="logistica">Logística</MenuItem>
                                <MenuItem value="calidad">Control de calidad</MenuItem>
                                <MenuItem value="mantenimiento">Mantenimiento</MenuItem>
                            </Select>
                        </FormControl>

                        {/* Card de Checkboxes con 4 + 3 checkboxes */}
                        <Card sx={{ 
                            p: 2,
                            backgroundColor: '#f5f5f5',
                            width: '300px',
                        }}>
                            <Box sx={{ 
                                display: 'flex',
                                gap: 4
                            }}>
                                {/* Grupo de 4 checkboxes */}
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox defaultChecked color="primary"/>} label="Inspeccion"/>
                                    <FormControlLabel control={<Checkbox color="primary"/>} label="Innoperativo"/>
                                    <FormControlLabel control={<Checkbox color="primary"/>} label="En reparación"/>
                                    <FormControlLabel control={<Checkbox color="primary"/>} label="Dado de baja"/>
                                </FormGroup>
                                
                                {/* Grupo de 3 checkboxes adicionales */}
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox color="primary"/>} label="Asi"/>
                                    <FormControlLabel control={<Checkbox color="primary"/>} label="dssa"/>
                                    <FormControlLabel control={<Checkbox color="primary"/>} label="baja"/>
                                </FormGroup>
                            </Box>
                        </Card>
                    </Box>

                    {/* Columna 2: Select Ambiente + Inputs */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 400 }}>
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
                                        <ArrowDropUpIcon sx={{ color: 'text.primary', mr: 3, fontSize: '2rem' }} />
                                    ) : (
                                        <ArrowDropDownIcon sx={{ color: 'text.primary', mr: 3, fontSize: '2rem' }} />
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

                        {/* factura, fecha factura, inspeccion */}
                        <Box sx={{
                            display: 'flex',
                            gap: 2
                        }}>
                            <TextField 
                                size="small"
                                label="Factura" 
                                variant="outlined"
                                sx={{ flex: 1, minWidth: 211 }}
                                fullWidth
                            />
                            <TextField 
                                size="small"
                                label="Fecha factura" 
                                variant="outlined"
                                sx={{ flex: 1, minWidth: 211 }}
                                fullWidth
                            />
                            <TextField 
                                size="small"
                                label="Inspeccion" 
                                variant="outlined"
                                sx={{ flex: 1, minWidth: 211 }}
                                fullWidth
                            />
                        </Box>

                        {/* Input de descripción adicional */}
                        <TextField 
                            label="Descripción adicional" 
                            variant="outlined"
                            sx={{ 
                                flexGrow: 1,
                                width: 665,
                                height: 70,
                                '& .MuiOutlinedInput-root': {
                                    height: '100%'
                                }
                            }}
                            InputProps={{
                                style: {
                                    height: '100%'
                                }
                            }}
                        />

                        {/* Segunda fila de inputs pequeños */}
                        <Box sx={{
                            display: 'flex',
                            gap: 2,
                            mt: 2
                        }}>
                            <TextField 
                                size="small"
                                label="Valor (bs.s)" 
                                variant="outlined"
                                sx={{ flex: 1, minWidth: 211 }}
                                fullWidth
                            />
                            <TextField 
                                size="small"
                                label="Denuncia" 
                                variant="outlined"
                                sx={{ flex: 1, minWidth: 211 }}
                                fullWidth
                            />
                            <Box sx={{ 
                                display: 'flex', 
                                flexDirection: 'column',
                                flex: 1,
                                minWidth: 211,
                                gap: 2
                            }}>
                                <TextField 
                                    size="small"
                                    label="Fecha denuncia" 
                                    variant="outlined"
                                    fullWidth
                                />
                                {/* Card con dos inputs y botones */}
                                <Card sx={{ 
                                    p: 2,
                                    backgroundColor: '#f5f5f5',
                                    width: 'calc(100% + 216px + 8px)',
                                    marginLeft: '-225px'
                                }}>
                                    <Box sx={{ 
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 2
                                    }}>
                                        <Box sx={{
                                            display: 'flex',
                                            gap: 1,
                                            alignItems: 'center'
                                        }}>
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
                                                    bgcolor: "darkblue", 
                                                    "&:hover": { bgcolor: "navy" }
                                                }}
                                            >
                                                Fecha actual
                                            </Button>
                                        </Box>

                                        <Box sx={{
                                            display: 'flex',
                                            gap: 1,
                                            alignItems: 'center'
                                        }}>
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
                                                    bgcolor: "darkblue", 
                                                    "&:hover": { bgcolor: "navy" }
                                                }}
                                            >
                                                Fecha actual
                                            </Button>
                                        </Box>
                                    </Box>
                                </Card>

                                {/* Tres botones */}
                                <Box sx={{
                                    display: 'flex',
                                    gap: 3,
                                    mt: 3,
                                    justifyContent: 'flex-start',
                                    width: '100%',
                                    paddingLeft: '40px'
                                }}>
                                    <Button 
                                        variant="outlined"
                                        sx={{ 
                                            width: 150,
                                            height: 45,
                                            color: "darkblue",
                                            borderColor: "darkblue",
                                            "&:hover": { 
                                                borderColor: "navy",
                                                backgroundColor: "rgba(0, 0, 139, 0.04)"
                                            }
                                        }}
                                    >
                                        Agregar registro
                                    </Button>
                                    <Button 
                                        variant="outlined"
                                        sx={{ 
                                            width: 150,
                                            height: 45,
                                            color: "darkblue",
                                            borderColor: "darkblue",
                                            "&:hover": { 
                                                borderColor: "navy",
                                                backgroundColor: "rgba(0, 0, 139, 0.04)"
                                            }
                                        }}
                                    >
                                        Actualizar registro
                                    </Button>
                                    <Button 
                                        variant="outlined"
                                        sx={{ 
                                            width: 150,
                                            height: 45,
                                            color: "darkblue",
                                            borderColor: "darkblue",
                                            "&:hover": { 
                                                borderColor: "navy",
                                                backgroundColor: "rgba(0, 0, 139, 0.04)"
                                            }
                                        }}
                                    >
                                        Eliminar registro
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    {/* Columna 3: Select Subgrupos */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 310 }}>
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
                                        <ArrowDropUpIcon sx={{ color: 'text.primary', mr: 3, fontSize: '2rem' }} />
                                    ) : (
                                        <ArrowDropDownIcon sx={{ color: 'text.primary', mr: 3, fontSize: '2rem' }} />
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
                    </Box>
                </Box>
            </Card>
        </DashboardLayout>
    );
}

export default BienesView;