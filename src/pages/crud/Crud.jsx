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

  const [productos, setProductos] = useState([
    {
      nombre: "Laptop",
      descripcion: "Laptop HP 8GB RAM",
      precio: "12000",
      cantidad: "5"
    },
    {
      nombre: "Mouse",
      descripcion: "Mouse inalámbrico",
      precio: "350",
      cantidad: "20"
    }
  ]);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [editando, setEditando] = useState(null);

  const limpiar = () => {
    setNombre("");
    setDescripcion("");
    setPrecio("");
    setCantidad("");
    setEditando(null);
  };

  const guardar = () => {
    if (!nombre || !descripcion || !precio || !cantidad) {
      alert("Completa todos los campos");
      return;
    }

    setProductos([
      ...productos,
      { nombre, descripcion, precio, cantidad }
    ]);

    limpiar();
    alert("Producto agregado");
  };

  const cargarEditar = (index) => {
    const producto = productos[index];

    setNombre(producto.nombre);
    setDescripcion(producto.descripcion);
    setPrecio(producto.precio);
    setCantidad(producto.cantidad);

    setEditando(index);
    setVista("editar");
  };

  const actualizar = () => {
    const copia = [...productos];

    copia[editando] = {
      nombre,
      descripcion,
      precio,
      cantidad
    };

    setProductos(copia);

    limpiar();
    setVista("consultar");

    alert("Producto actualizado");
  };

  const eliminar = (index) => {
    if (window.confirm("¿Deseas eliminar este producto?")) {
      setProductos(productos.filter((_, i) => i !== index));
      alert("Producto eliminado");
    }
  };

  return (
    <PageContainer title="Sistema CRUD de Productos">
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

        <Button
          variant="contained"
          color="error"
          onClick={() => setVista("eliminar")}
        >
          Eliminar
        </Button>
      </Box>

      {(vista === "crear" || vista === "editar") && (
        <Card>
          <CardContent>
            <Typography variant="h6">
              {vista === "crear" ? "Registrar Producto" : "Editar Producto"}
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
                  label="Descripción"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Precio"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Cantidad"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
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
            <Typography variant="h6">
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