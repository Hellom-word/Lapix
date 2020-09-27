const express = require('express')
const routes = express.Router()

routes.get('/',  function(req, res){
    return res.render('professores/index')
})
routes.get('/estudantes',  function(req, res){
    return res.render('estudantes/index')
})
routes.get('/',  function(req, res){
    return res.render()
})

module.exports = routes