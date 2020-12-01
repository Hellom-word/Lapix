const express = require('express')
const routes = express.Router()
const professores = require('./controllers/professores')
const estudantes = require('./controllers/estudantes')

routes.get('/', professores.index)
routes.get('/professores', professores.index)
routes.get('/professores/create', professores.create)
routes.get('/professores/:id', professores.show)
routes.get('/professores/:id/edit', professores.edit)
routes.post("/professores", professores.post )
routes.put("/professores", professores.put)
routes.delete("/professores", professores.delete)


routes.get('/estudantes', estudantes.index)
routes.get('/estudantes/create', estudantes.create)
routes.get('/estudantes/:id', estudantes.show)
routes.get('/estudantes/:id/edit', estudantes.edit)
routes.post("/estudantes", estudantes.post )
routes.put("/estudantes", estudantes.put)
routes.delete("/estudantes", estudantes.delete)


module.exports = routes