const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
let db = [
	{ id: 1, address: 'Dirección 1' },
	{ id: 2, address: 'Dirección 2' },
	{ id: 3, address: 'Dirección 3' },
]

app.use(bodyParser.json())

app.listen(port, () => {
	console.log('Servidor activo en el puerto ' + port)
})

// http://localhost:3000/
app.get('/', (req, res) => {
	res.send('Metodo get')
})

// http://localhost:3000/direcciones
app.get('/direcciones', (req, res) => {
	responsePer(res)
})

// http://localhost:3000/direcciones
app.post('/direcciones', (req, res) => {
	db.push(req.body)
	responsePer(res)
})

// http://localhost:3000/direcciones/:id
app.delete('/direcciones/:id', (req, res) => {
	db = db.filter((e) => {
		return e.id !== parseInt(req.params.id)
	})
	responsePer(res)
})

// http://localhost:3000/direcciones/

app.put('/direcciones/:id', (req, res) => {
	db = db.map((element) => {
		if (parseInt(element.id) === parseInt(req.params.id)) {
			element.address = req.body.address
		}
		return element
	})
	responsePer(res)
})

const responsePer = (res) => {
	const response = {
		msg: 'direcciones obtenidas',
		total: db.length,
		data: db,
		status: 'ok',
	}
	res.json(response)
}
