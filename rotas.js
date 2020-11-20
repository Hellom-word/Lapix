const express = require('express')
const routes = express.Router()
const professores = require('./professores')

routes.get('/professores', professores.index)

routes.get('/estudantes',  function(req, res){
    return res.render('estudantes/index')
})

routes.get('/professores/create', function(req, res){
    return res.render('professores/create')
})

routes.get('/professores/:id', professores.show)

routes.get('/professores/:id/edit', professores.edit)

routes.post("/professores", professores.post )

routes.put("/professores", professores.put)

routes.delete("/professores", professores.delete)

module.exports = routes