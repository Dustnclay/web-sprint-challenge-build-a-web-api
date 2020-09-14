const express =require('express')
const server = express();
const actionsRouter = require('./data/helpers/actionsRouter')
const projectRouter = require('./data/helpers/projectRouter')

server.use(express.json());

server.use('/actions',actionsRouter)
server.use('/projects',projectRouter)
server.get('/', (req,res) => {
    res.status(200).json({message:"server online"})
})

module.exports = server