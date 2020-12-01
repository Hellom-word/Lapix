const data = require('../data.json')
const fs= require('fs')
const { age, graduationFund, date } = require('../utils')


exports.index =   function(req, res){
    return res.render('estudantes/index', {estudantes: data.estudantes})
}
exports.create = function(req, res){
    return res.render('estudantes/create')
}
exports.post = function(req, res){ 

    const keys = Object.keys(req.body)

    for(key of keys) {
        if (req.body[key] == ""){
            return res.send('Please, fill all fields!')
        }
    }

    birth = Date.parse(req.body.birth)
    const created_at = Date.now()
    let id = 1
	const lastEstudante = data.estudantes[data.estudantes.length - 1]
 				
		if(lastEstudante) {
			id = lastEstudante.id + 1
		}


        data.estudantes.push({
            id,
            ...req.body,
            birth
        })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error!")
    })
    
    
    return res.redirect("./estudantes")
}
exports.show = function(req, res){
    const { id } = req.params 

    const foundEstudante = data.estudantes.find(function(estudante){
        return id == estudante.id										
    })

    if (!foundEstudante) return res.send("teacher not found!")
    
    

    const estudante = {
        ...foundEstudante, 
        age: age(foundEstudante.birth),
        escolaridade: graduationFund(foundEstudante.escolaridade),
        atuacao: foundEstudante.atuacao.split(","),
        /* created_at: new Intl.DateTimeFormat("en-us").format(foundEstudante.created_at) */
    }

    return res.render("estudantes/show", {estudante})


}						
exports.edit = function(req, res){
    const { id } = req.params 

    const foundEstudante = data.estudantes.find(function(estudante){
        return id == estudante.id										
    })

    if (!foundEstudante) return res.send("teacher not found!")

    const estudante = {
        ...foundEstudante,
        birth: date(foundEstudante.birth)
    }

    return res.render('estudantes/edit', { estudante})
}
exports.put = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundEstudante = data.estudantes.find(function(estudante, foundIndex){
        if (id == estudante.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundEstudante) return res.send("Estudante Not Found")

    const estudante = {
        ...foundEstudante,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.estudantes[index] = estudante

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if(err) return res.send("write error!")

        return res.redirect(`/estudantes/${id}`)
    })
}
exports.delete = function(req, res){
    const { id } = req.body

    const filteredEstudantees = data.estudantes.filter(function(estudante){
        return estudante.id != id
    })

    data.estudantes = filteredEstudantees

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file error!")

        return res.redirect("/")
    })
}