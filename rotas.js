const express = require('express')
const routes = express.Router()
const professores = require('./professores')

routes.get('/',  function(req, res){
    return res.render('professores/index')
})
routes.get('/estudantes',  function(req, res){
    return res.render('estudantes/index')
})
routes.get('/',  function(req, res){
    return res.render()
})

routes.get('/professores/create', function(req, res){
    return res.render('professores/create')
})

routes.get('/professores/:id', professores.show)

routes.get('/professores/:id/edit', professores.edit)

routes.post("/professores", professores.post )



module.exports = routes