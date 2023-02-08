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


// ----------Routers----------

const routerArgentina = express.Router()
app.use('/api/argentina/', routerArgentina);


// ---------- Gets ----------

app.get('/', (req, res) => {
	res.redirect('/index.html')
})

app.get('/api', (req, res) => {
	res.redirect('../index.html')
})

// --- Router Arg --

routerArgentina.get('/', (req, res) => {
	res.json(argentinianTeam)
})

// Get segun posicion

routerArgentina.get('/arqueros', (req, res) => {
	const arqueros = argentinianTeam.filter(jugador => jugador.position == 'Arquero')
	res.json(arqueros)
})

routerArgentina.get('/delanteros', (req, res) => {
	const delantero = argentinianTeam.filter(jugador => jugador.position == 'Delantero')
	res.json(delantero)
})

routerArgentina.get('/mediocampistas', (req, res) => {
	const mediocampistas = argentinianTeam.filter(jugador => jugador.position == 'Mediocampista')
	res.json(mediocampistas)
})


routerArgentina.get('/defensores', (req, res) => {
	const defensores = argentinianTeam.filter(jugador => jugador.position == 'Defensor')
	res.json(defensores)
})

// Get segun dorsal o nombre

routerArgentina.get('/:dorsalOrName', (req, res) => {
	if (!isNaN(req.params.dorsalOrName)) {
		const jugadorDorsal = argentinianTeam.filter(element => element.dorsal == req.params.dorsalOrName)
		res.json(jugadorDorsal)
	} else {
		const jugadorName = argentinianTeam.filter(jugador =>
			jugador.name.split(' ')[1].toUpperCase() == req.params.dorsalOrName.toUpperCase() ||
			jugador.name.split(' ')[0].toUpperCase() == req.params.dorsalOrName.toUpperCase()
		)
		res.json(jugadorName)
	}
})


// ----------POST----------

routerArgentina.post('/', (req, res) => {
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