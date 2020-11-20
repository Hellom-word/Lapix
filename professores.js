const data = require("./data.json")
const fs= require('fs')
const {age, graduation, date}= require('./utils')

//index
exports.index =   function(req, res){
    return res.render('professores/index', {professores: data.professores})
}


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

//put
exports.put = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundProfessor = data.professores.find(function(professor, foundIndex){
        if (id == professor.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundProfessor) return res.send("Professor Not Found")

    const professor = {
        ...foundProfessor,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.professores[index] = professor

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if(err) return res.send("write error!")

        return res.redirect(`/professores/${id}`)
    })
}
//delete

exports.delete = function(req, res){
    const { id } = req.body

    const filteredProfessores = data.professores.filter(function(professor){
        return professor.id != id
    })

    data.professores = filteredProfessores

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file error!")

        return res.redirect("/")
    })
}