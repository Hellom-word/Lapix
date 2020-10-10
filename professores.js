const data = require("./data.json")
const fs= require('fs')
const {age, graduation, date}= require('./utils')
//create
exports.post = function(req, res){ 

    const keys = Object.keys(req.body)

    for(key of keys) {
        if (req.body[key] == ""){
            return res.send('Please, fill all fields!')
        }
    }

    let {avatar_url, birth, name, escolaridade, tipo_aula, atuacao} = req.body

    birth = Date.parse(req.body.birth)
    const created_at = Date.now()
    const id = Number(data.professores.length + 1) 


    data.professores.push({
        id,
        avatar_url,
        name,
        birth,
        escolaridade,
        tipo_aula,
        atuacao,
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error!")
    })
    
    
    return res.redirect("./")
}

// show
exports.show = function(req, res){
    const { id } = req.params 

    const foundProfessor = data.professores.find(function(professor){
        return id == professor.id										
    })

    if (!foundProfessor) return res.send("teacher not found!")
    
    

    const professor = {
        ...foundProfessor, 
        age: age(foundProfessor.birth),
        escolaridade: graduation(foundProfessor.escolaridade),
        atuacao: foundProfessor.atuacao.split(","),
        created_at: new Intl.DateTimeFormat("en-us").format(foundProfessor.created_at)
    }

    return res.render("professores/show", {professor})


}						
// Edit

exports.edit = function(req, res){
    const { id } = req.params 

    const foundProfessor = data.professores.find(function(professor){
        return id == professor.id										
    })

    if (!foundProfessor) return res.send("teacher not found!")

    const professor = {
        ...foundProfessor,
        birth: date(foundProfessor.birth)
    }

    return res.render('professores/edit', { professor})
}
//delete