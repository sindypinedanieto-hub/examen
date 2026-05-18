import { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";

import PageContainer from "../../components/common/PageContainer";

export default function Crud() {
  const [usuarios, setUsuarios] = useState([
    { nombre: "Juan", correo: "juan@test.com" },
    { nombre: "Luz", correo: "luz@test.com" }
  ]);

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [editando, setEditando] = useState(null);

  const guardar = () => {
    if (!nombre || !correo) {
      alert("Completa todos los campos");
      return;
    }

    if (editando !== null) {
      const copia = [...usuarios];
      copia[editando] = { nombre, correo };
      setUsuarios(copia);
      setEditando(null);
    } else {
      setUsuarios([...usuarios, { nombre, correo }]);
    }

    setNombre("");
    setCorreo("");
  };

  const editar = (index) => {
    setNombre(usuarios[index].nombre);
    setCorreo(usuarios[index].correo);
    setEditando(index);
  };

  const eliminar = (index) => {
    if (window.confirm("¿Deseas eliminar este registro?")) {
      setUsuarios(usuarios.filter((_, i) => i !== index));
    }
  };

  return (
    <PageContainer title="CRUD de Usuarios">
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {editando !== null ? "Editar Usuario" : "Registrar Usuario"}
              </Typography>

              <TextField
                fullWidth
                label="Nombre"
                margin="normal"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />

              <TextField
                fullWidth
                label="Correo"
                margin="normal"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                onClick={guardar}
              >
                {editando !== null ? "Actualizar" : "Guardar"}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Lista de Usuarios
              </Typography>

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Correo</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {usuarios.map((usuario, index) => (
                    <TableRow key={index}>
                      <TableCell>{usuario.nombre}</TableCell>
                      <TableCell>{usuario.correo}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Button
                            variant="outlined"
                            onClick={() => editar(index)}
                          >
                            Editar
                          </Button>

                          <Button
                            color="error"
                            variant="contained"
                            onClick={() => eliminar(index)}
                          >
                            Eliminar
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
}