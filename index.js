//Servidor.
import express from 'express';
const app = express();
app.listen(3000, console.log("SERVIDOR ARRIBA"));

//Importaciones.
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import _ from 'lodash';
import chalk from 'chalk';

//Ejecución de requerimientos.
// Ruta para consultar usuarios.
app.get('/', (req, res) => {
  //Metodo axios para trabajar con la API.
  axios.get("https://randomuser.me/api/?results=11").then((response) => {
    const usuarios = response.data.results.slice(0, 11).map((result) => ({
      nombre: result.name.first,
      apellido: result.name.last,
      id: uuidv4(),
      timestamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
      genero: result.gender
    }));
    usuarios.forEach(usuario => {
    });
    //Método Lodash.
    const [mujeres, hombres] = _.partition(usuarios, (usuario) => usuario.genero === 'female');

    //Mostrar usuarios por género y aplicar chalk.
    console.log('Mujeres:');
    mujeres.forEach(usuario => {
      console.log(chalk.bgWhite.blue(`Nombre: ${usuario.nombre} - Apellido: ${usuario.apellido} - UUID: ${usuario.id} - Timestamp: ${usuario.timestamp}`));
    });
    console.log('Hombres:');
    hombres.forEach(usuario => {
      console.log(chalk.bgWhite.blue(`Nombre: ${usuario.nombre} - Apellido: ${usuario.apellido} - UUID: ${usuario.id} - Timestamp: ${usuario.timestamp}`));
    });

    //Manejo de errores.
    res.json({ usuarios });
  }).catch(error => {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  });
});