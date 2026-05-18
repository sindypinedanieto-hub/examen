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
  const [vista, setVista] = useState("crear");

  const [usuarios, setUsuarios] = useState([
    { nombre: "Juan", correo: "juan@test.com" },
    { nombre: "Luz", correo: "luz@test.com" }
  ]);

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [editando, setEditando] = useState(null);

  const limpiar = () => {
    setNombre("");
    setCorreo("");
    setEditando(null);
  };

  const guardar = () => {
    if (!nombre || !correo) {
      alert("Completa todos los campos");
      return;
    }

    setUsuarios([...usuarios, { nombre, correo }]);
    limpiar();
    alert("Registro creado");
  };

  const cargarEditar = (index) => {
    setNombre(usuarios[index].nombre);
    setCorreo(usuarios[index].correo);
    setEditando(index);
    setVista("editar");
  };

  const actualizar = () => {
    if (!nombre || !correo) {
      alert("Completa todos los campos");
      return;
    }

    const copia = [...usuarios];
    copia[editando] = { nombre, correo };
    setUsuarios(copia);

    limpiar();
    setVista("consultar");
    alert("Registro actualizado");
  };

  const eliminar = (index) => {
    if (window.confirm("¿Deseas eliminar este registro?")) {
      setUsuarios(usuarios.filter((_, i) => i !== index));
      alert("Registro eliminado");
    }
  };

  return (
    <PageContainer title="Sistema CRUD">
      <Box sx={{ mb: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Button variant="contained" onClick={() => setVista("crear")}>
          Crear
        </Button>

        <Button variant="contained" onClick={() => setVista("consultar")}>
          Consultar
        </Button>

        <Button variant="contained" onClick={() => setVista("editar")}>
          Editar
        </Button>

        <Button variant="contained" color="error" onClick={() => setVista("eliminar")}>
          Eliminar
        </Button>
      </Box>

      {(vista === "crear" || vista === "editar") && (
        <Card>
          <CardContent>
            <Typography variant="h6">
              {vista === "crear" ? "Crear Registro" : "Editar Registro"}
            </Typography>

            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Correo"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={vista === "crear" ? guardar : actualizar}
                >
                  {vista === "crear" ? "Guardar" : "Actualizar"}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {(vista === "consultar" || vista === "eliminar") && (
        <Card>
          <CardContent>
            <Typography variant="h6">Lista de Registros</Typography>

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
                      <Button
                        onClick={() => cargarEditar(index)}
                        sx={{ mr: 1 }}
                      >
                        Editar
                      </Button>

                      <Button
                        color="error"
                        onClick={() => eliminar(index)}
                      >
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </PageContainer>
  );
}