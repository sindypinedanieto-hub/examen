import {
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar
} from "@mui/material";

import PageContainer from "../../components/common/PageContainer";

import juan from "../../assets/juan.png";
import luz from "../../assets/luz.png";
import syn from "../../assets/syn.png";

const integrantes = [
  {
    nombre: "Juan Carlos Albarrán Sánchez",
    matricula: "2022150480011",
    carrera: "Ingeniería en Sistemas Computacionales",
    correo: "2022150480011@tesjo.edu.mx",
    foto: juan,
    rol: "Full Stack Developer",
    bio: "Responsable del desarrollo e integración de funcionalidades del sistema, asegurando eficiencia y correcto funcionamiento."
  },
  {
    nombre: "Luz Nadia Flores Domínguez",
    matricula: "2022150480327",
    carrera: "Ingeniería en Sistemas Computacionales",
    correo: "2022150480327@tesjo.edu.mx",
    foto: luz,
    rol: "Arquitecta de Software",
    bio: "Encargada de la estructura técnica del proyecto y la correcta organización de componentes."
  },
  {
    nombre: "Sindy Pineda Nieto",
    matricula: "2022150480905",
    carrera: "Ingeniería en Sistemas Computacionales",
    correo: "2022150480905@tesjo.edu.mx",
    foto: syn,
    rol: "Diseñadora UX/UI",
    bio: "Diseña interfaces modernas, intuitivas y responsivas enfocadas en la experiencia del usuario."
  }
];

export default function Equipo() {
  return (
    <PageContainer title="Equipo de Trabajo">
      <Grid container spacing={3}>
        {integrantes.map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card>
              <CardContent sx={{ textAlign: "center" }}>
                <Avatar
                  src={item.foto}
                  sx={{
                    width: 100,
                    height: 100,
                    margin: "auto",
                    mb: 2
                  }}
                />

                <Typography variant="h6">{item.nombre}</Typography>
                <Typography>{item.matricula}</Typography>
                <Typography>{item.carrera}</Typography>
                <Typography>{item.correo}</Typography>
                <Typography sx={{ mt: 1 }}>
                  <strong>{item.rol}</strong>
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {item.bio}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
}