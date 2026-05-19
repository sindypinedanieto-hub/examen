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
  const [vista, setVista] = useState("consultar");

  const [productos, setProductos] = useState([
    {
      nombre: "Laptop",
      descripcion: "Laptop HP",
      precio: "12000",
      cantidad: "5"
    },
    {
      nombre: "Mouse",
      descripcion: "Mouse inalámbrico",
      precio: "300",
      cantidad: "10"
    }
  ]);

  const [formulario, setFormulario] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    cantidad: ""
  });

  const [indiceEditar, setIndiceEditar] = useState(null);

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const limpiarFormulario = () => {
    setFormulario({
      nombre: "",
      descripcion: "",
      precio: "",
      cantidad: ""
    });
    setIndiceEditar(null);
  };

  const crearProducto = () => {
    if (
      !formulario.nombre ||
      !formulario.descripcion ||
      !formulario.precio ||
      !formulario.cantidad
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }

    setProductos([...productos, formulario]);
    limpiarFormulario();
    alert("Producto agregado");
    setVista("consultar");
  };

  const seleccionarEditar = (index) => {
    setFormulario(productos[index]);
    setIndiceEditar(index);
    setVista("editar");
  };

  const actualizarProducto = () => {
    const copia = [...productos];
    copia[indiceEditar] = formulario;

    setProductos(copia);
    limpiarFormulario();
    alert("Producto actualizado");
    setVista("consultar");
  };

  const eliminarProducto = (index) => {
    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar este producto?"
    );

    if (confirmar) {
      setProductos(productos.filter((_, i) => i !== index));
      alert("Producto eliminado");
    }
  };

  const renderFormulario = (modo) => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {modo === "crear" ? "Crear Producto" : "Editar Producto"}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Nombre"
              name="nombre"
              value={formulario.nombre}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Descripción"
              name="descripcion"
              value={formulario.descripcion}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Precio"
              name="precio"
              value={formulario.precio}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Cantidad"
              name="cantidad"
              value={formulario.cantidad}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={
                modo === "crear"
                  ? crearProducto
                  : actualizarProducto
              }
            >
              {modo === "crear" ? "Guardar" : "Actualizar"}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const renderTabla = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Lista de Productos
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {productos.map((producto, index) => (
              <TableRow key={index}>
                <TableCell>{producto.nombre}</TableCell>
                <TableCell>{producto.descripcion}</TableCell>
                <TableCell>${producto.precio}</TableCell>
                <TableCell>{producto.cantidad}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => seleccionarEditar(index)}
                    sx={{ mr: 1 }}
                  >
                    Editar
                  </Button>

                  <Button
                    color="error"
                    onClick={() => eliminarProducto(index)}
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
  );

  return (
    <PageContainer title="Sistema CRUD de Productos">
      <Box sx={{ mb: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Button variant="contained" onClick={() => setVista("crear")}>
          Crear
        </Button>

        <Button variant="contained" onClick={() => setVista("consultar")}>
          Consultar
        </Button>

        <Button variant="contained" onClick={() => setVista("editar")}>
          Editar
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={() => setVista("consultar")}
        >
          Eliminar
        </Button>
      </Box>

      {vista === "crear" && renderFormulario("crear")}
      {vista === "editar" && renderFormulario("editar")}
      {vista === "consultar" && renderTabla()}
    </PageContainer>
  );
}