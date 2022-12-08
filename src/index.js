const express = require('express')
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config()

let { db } = require('./database/db')
// const { v4: uuid } = require('uuid')
app.use(bodyParser.json())

// http://localhost:3000/
app.get('/', (req, res) => {
	res.send('Metodo get')
})

// http://localhost:3000/peliculas
app.get('/peliculas', (req, res) => {
	resPeliculas(res)
})

// http://localhost:3000/peliculas
app.post('/peliculas', (req, res) => {
	db.push(req.body)
	resPeliculas(res)
})

// http://localhost:3000/peliculas/:id
app.delete('/peliculas/:id', (req, res) => {
	db = db.filter((e) => {
		return e.id !== parseInt(req.params.id)
	})
	resPeliculas(res)
})

// http://localhost:3000/peliculas/

app.put('/peliculas/:id', (req, res) => {
	db = db.map((element) => {
		if (parseInt(element.id) === parseInt(req.params.id)) {
			element.year = req.body.year ? req.body.year : element.year
			element.title = req.body.title
			element.price = req.body.price
		}
		return element
	})
	resPeliculas(res)
})

const resPeliculas = (res) => {
	const response = {
		msg: 'peliculas obtenidas',
		total: db.length,
		data: db,
		status: 'ok',
	}
	res.json(response)
}

app.listen(process.env.PORT, () => {
	console.log('Servidor activo en el puerto ', process.env.PORT)
})
