// ----------Requires----------
const express = require('express')
const app = express()
const cors = require('cors')

const logger = require('./src/loggerMiddleware.js')
const argentinianTeam = require('./src/argentinianTeam.js').argentinianTeam

// ----------Middleware----------
app.use(cors())
app.use(express.json())
app.use(logger)
app.use(express.static('public'))

// ----------Gets----------
app.get('/', (req, res) => {
	res.redirect('/index.html')
})

app.get('/api', (req, res) => {
	res.redirect('../index.html')
})

app.get('/api/argentina', (req, res) => {
	res.json(argentinianTeam)
})

// ----------POST----------

app.post('/api/argentina', (req, res) => {
	const newPlayer = req.body;
	argentinianTeam.push(newPlayer);
	res.json(newPlayer); 
})

// ----------Manejar error----------
app.use((req, res) => {
	res.status(404).json({
		error: 'Not Found',
		code: 404
	})
})

// ----------PORT and Listen----------
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log('Servidor escuchando en el puerto: ' + PORT);
})