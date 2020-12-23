const { age, date } = require('../../lib/utils')

module.exports = {
    index(req, res){
        return res.render('professores/index')
    },   
    create(req, res){
        return res.render('professores/create')        
    },   
    post(req, res){
    
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] == ""){
                return res.send('Please, fill all fields!')
            }
        }

        let {avatar_url, birth, name, escolaridade, tipo_aula, atuacao} = req.body        
    
    },   
    show(req, res){
        return        
    },                
    edit(req, res){
        return
    },   
    put(req, res){
        
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] == ""){
                return res.send('Please, fill all fields!')
            }
        }

    },   
    delete(req, res){
        return
    }   
}
