const data = require("./data.json")
const fs= require('fs')

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

//update

//delete