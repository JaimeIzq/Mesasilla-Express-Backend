const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const uuidValidate = require("uuid");

const app = express();

const port = 3000;

const catalogo = require("./mock/Catalogo.json");
const usuarios = require("./mock/Usuarios.json");
const tokens = require("./mock/Tokens.json");

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


/**
 * Users API
 */
app.post("/user/register", (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
	let email = req.body.email;
	let user = usuarios.filter((user) => user.username == username);

	if (user < 1) {
		let token = uuidv4();
		let userId = usuarios[usuarios.length - 1].id + 1;
		usuarios.push({
			"id": userId,
			"username": username,
			"email": email,
			"password": bcrypt.hashSync(password, 10),
			"isAdmin": false
		});

		tokens.push({
			"id": userId,
			"token": token
		});

		res.json({
			"token": token
		});

		console.log("New user registered and new token. UserID: " + userId);
		console.log({ "username": username, "token": token });

		return true;
	}

	console.error("[ERROR]: Bad User registration. Data provided: ", {
		"username": username,
		"email": email,
		"password": password
	});

	res.sendStatus(400);
	return false;
})

app.post("/user/login", (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
	let user = usuarios.filter((user) => user.username == username)[0];

	if (user != null && bcrypt.compareSync(password, user.password)) {
		let token = uuidv4();

		tokens.push({
			"id": user.id,
			"token": token
		});

		res.json({
			"token": token
		});

		console.log("New user login, new token generated. UserID: " + user.id);
		console.log({ "username": username, "token": token });
		return true;
	}

	console.error("[ERROR]: Bad User login. Data provided: ", {
		"username": username,
		"password": password
	});

	res.sendStatus(400);
	return false;
})

app.post('/user', (req, res) => {
	let token = req.body.token;
	if (token != null) {
		let currentToken = tokens.filter(t => t.token == token)[0];

		if (currentToken != null) {
			let user = usuarios.filter(user => user.id == currentToken.id)[0];

			res.json({
				"id": user.id,
				"username": user.username,
				"email": user.email,
				"isAdmin": user.isAdmin
			});
			console.log("User data requested. Name: ", user.username);
			console.log(user);
			return true;
		}
	}

	console.error(
		"[ERROR]: Bad username or token on user data request. Token: " + token
	);

	res.sendStatus(400);
	return false;
});

/**
 * TODO: Agregar borrado de tokens para cerrar sesiones.
 */
// app.post('/user/logout', (req, res) => {
// 	let token = req.body.token;
// 	// tokens. // .filter(user => user.token == token)[0];
// });

console.log(bcrypt.hashSync('admin', 10));
