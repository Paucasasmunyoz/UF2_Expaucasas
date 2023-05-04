const express = require('express')
const cors = require('cors')
const app = express();
const fs1 = require('node:fs')
const stream = require('stream')
const mysql = require('mysql2')
const Sequelize = require('sequelize')

//prova
app.use(cors());
app.use(express.json());
port = 3080;

let connexio_BD;
let conexioMySQL;


fs1.readFile('connexioBD', 'utf8', function (err, data) {
  if (err) throw err;
  connexio_BD = data;
  console.log(connexio_BD)
  console.log('Connexió feta')
});

//Connexió MYSQL
const configObj = JSON.parse(fs1.readFileSync('ConnexioBD_MySQL', 'utf8'));

const connexioMySQL = mysql.createConnection({
  database : configObj.database,
  user : configObj.username,
  password : configObj.password,
  host : configObj.host,

});

connexioMySQL.connect((err) => {
  if (err) throw err;
  console.log('Connexió MySQL realitzada');
});


//EX1
app.post('/add-alumn-virgen', (req, res) => {
  const sql = 'ALTER TABLE ALUMNES ADD ALUMN_VIRGEN INT DEFAULT 0';

  connexioMySQL.query(sql, (error, results) => {
    if (error) {
      console.error('No se pudo agregar el campo ALUMN_VIRGEN: ', error);
      res.status(500).send('No se pudo agregar el campo ALUMN_VIRGEN.');
    } else {
      console.log('El campo ALUMN_VIRGEN se agregó correctamente.');
      const updateSql = 'UPDATE ALUMNES SET ALUMN_VIRGEN = 0';
      connexioMySQL.query(updateSql, (error, results) => {
        if (error) {
          console.error('No se pudo actualizar el campo ALUMN_VIRGEN: ', error);
          res.status(500).send('No se pudo actualizar el campo ALUMN_VIRGEN.');
        } else {
          console.log('El campo ALUMN_VIRGEN se actualizó correctamente.');
          res.send('El campo ALUMN_VIRGEN se agregó y actualizó correctamente.');
        }
      });
    }
  });
});


//EX2
const assigInfo = [
  { codi: 'INF001', nom: 'Introducció a la informàtica' },
  { codi: 'INF002', nom: 'Programació' },
  { codi: 'MMA001', nom: 'Càlcul' },
  { codi: 'MMA002', nom: 'Àlgebra' },
  { codi: 'MMA003', nom: 'Geometria' },
  { codi: 'MMA004', nom: 'Estadística' },
  { codi: 'MMA005', nom: 'Probabilitat' },
  { codi: 'INF003', nom: 'Sistemes Operatius' },
  { codi: 'INF004', nom: 'Bases de Dades' },
  { codi: 'INF005', nom: 'Xarxes i Internet' },
  { codi: 'INF006', nom: 'Intel·ligència Artificial' },
  { codi: 'INF007', nom: 'Seguretat Informàtica' },
  { codi: 'MMA006', nom: 'Optimització' },
  { codi: 'MMA007', nom: 'Equacions Diferencials' },
];

app.get('/llista-assig-info', (req, res) => {
  const informaticaMMA = assigInfo.filter(assig => assig.codi.startsWith('INF') || assig.codi.startsWith('MMA'));
  res.json(informaticaMMA);
});


//EX3
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.put('/modificar-departament', (req, res) => {
  const id = req.body.id;
  const ubicacio = req.body.ubicacio;

  if (!id || !ubicacio) {
    res.status(400).send('Falta ID de departamento o ubicación');
    return;
  }


  const resultado = actualizarDepartament(id, ubicacio);


  if (resultado) {
    res.send(resultado);
  } else {
    res.status(400).send('No puc, pelacanyes!');
  }
});

function actualizarDepartament(id, ubicacio) {

  const departamento = { id: id, nom: 'Departament 1', ubicacio: ubicacio };
  return departamento;
}

