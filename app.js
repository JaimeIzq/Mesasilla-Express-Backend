const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const catalogo = require("./Catalogo.json");

app.use(cors());
app.use(express.json());


/**
 * Test API.
 */

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get("/greetings", (req, res) => {
	res.send(`Who are you?`);
});

app.get("/greetings/:name", (req, res) => {
	let name = req.params.name;
	res.send(`Welcome ${name}!`);
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});


/**
 * Catalogo API
 * 
 */
app.get("/catalogo", (req, res) => {
	res.redirect("/catalogo/productos");
});

// Get all
app.get("/catalogo/productos", (req, res) => {
	res.json(catalogo);
});

// Get by id
app.get("/catalogo/producto/:id", (req, res) => {
	let id = req.params.id;
	res.json(catalogo.filter((prod) => prod.id == id)[0]);
});

/**
 * Create a new product
 * TODO: verify input data is correct and the id is unique.
 **/ 
app.put("/catalogo/productos", (req, res) => {
	let id = catalogo.length;

	if (catalogo.filter((cat) => cat.id == id).length > 0) {
		res.status(501);
		res.send("Error: object already exists");
	}

	catalogo.push({
		id: catalogo.length,
		nombre: req.body.nombre,
		descripcion: req.body.descripcion,
		urlimagen: "../../assets/img/silla1.jpg",
		precio: 90,
		cantidad: 2000,
	});

	res.json(catalogo.filter((cat) => cat.id == id)[0]);
});

/**
 * TODO: update product, Verify that the product to be updated
 *  already exists.
 **/ 
app.post("/catalogo/productos", (req, res) => {
	res.send(`WIP`);
});

/**
 * TODO: update product, Verify that the new id doew not exist and
 *  the product to be updated already exists.
 **/ 
app.post("/catalogo/producto/:id", (req, res) => {
	let id = req.params.id;
	let updated = new Product
	let producto = catalogo.filter((prod) => prod.id == id);

	if (preducto != null) 
		catalogo[id] = producto;

	// res.json(producto);
	res.send(`WIP`);
});

/**
 * TODO: Add delete functionality
 */
app.delete("/catalogo/producto/:id", (req, res) => {
	res.send(`WIP`);
});
