const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
const { PORT } = require('./config/server')
const Users = require('./routes/user')
const Projects = require('./routes/project')
const Experiences = require('./routes/experience')

app.set('port', PORT)

app.use(express.json({limit: '50mb'}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())
app.use(morgan('dev'))

app.use('/api/users', Users)
app.use('/api/projects', Projects)
app.use('/api/experiences', Experiences)

module.exports = app