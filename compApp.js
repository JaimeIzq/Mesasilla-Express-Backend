const express = require("express");
const app = express();
const port = 3300;
var cors = require("cors");

//Añadimos el proceso de
app.use(cors());

//Para trabajar con procesos que sean JSON.
app.use(express.json());

/** Variables de CATALOGO */
let catalogo = [
  {
    id: 1,
    nombre: "Emperador",
    descripcion: "Silla realizada en cuero 100%",
    urlimagen: "../../assets/img/silla1.jpg",
    precio: 90,
    cantidad: 2000,
  },
  {
    id: 2,
    nombre: "Atun",
    descripcion: "Silla realizada algodon 100% sin manchas",
    urlimagen: "../../assets/img/silla2.jpg",
    precio: 90,
    cantidad: 2000,
  },
  {
    id: 3,
    nombre: "Inycom",
    descripcion: "Silla realizada con personal de Inycom",
    urlimagen: "../../assets/img/silla3.jpg",
    precio: 80,
    cantidad: 2000,
  },
  {
    id: 4,
    nombre: "Angular",
    descripcion:
      "Silla realizada con la piel de los que no sepan realizar este ejercicio",
    urlimagen: "../../assets/img/silla4.jpg",
    precio: 70,
    cantidad: 2000,
  },
  {
    id: 5,
    nombre: "Paro",
    descripcion: "Silla ergonomica para cuando vayas a la lista del paro",
    urlimagen: "../../assets/img/silla5.jpg",
    precio: 60,
    cantidad: 2000,
  },
  {
    id: 6,
    nombre: "Empleo",
    descripcion:
      "Silla realizada para los que saquen el ejercicio correctamente",
    urlimagen: "../../assets/img/silla6.jpg",
    precio: 50,
    cantidad: 2000,
  },
];

// Variables de usuarios
let usuarios = [];

//Definimos los usuarios como nuevo array.let usuarios = new Array();

/** Funcion get */
app.get('/', (req, res) => {
    res.send(catalogo)
})

/** getUsuarios */
app.get('/getUsuarios', (req, res) => { 
    res.send(usuarios)
})

/** Post del proceso */
app.post('/usuario', (req, res) => { 
    let data = req.body;
    //Al recibirlo ya tengo el JSON con el parse JSON. 
    //Guardamos el usuario. 
    usuarios.push(data); 
    console.log(usuarios);

    //Devolvemos el usuario creado
    res.json(data);
})

/** getUsuarios */
app.get('/usuarios', (req, res) => {
    res.send(usuarios);
})

/** Borrado del objeto */
app.delete('/borrar', (req, res) => { 
    //Inicializamos el catalogo.
    res.send("DELETE Request Called:"+this.catalogo);
})

app.listen(port, () => { 
    console.log(`Example app listening on port ${port}`);
})
