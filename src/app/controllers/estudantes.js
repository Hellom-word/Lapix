const { age, date } = require('../../lib/utils')
const Student = require('..models/Student')

module.exports = {
    index(req, res){
        Student.all(function(students) {
            return res.render("estudantes/index", {students})
    
        })
    },   
    create(req, res){
        return res.render('estudantes/create')        
    },   
    post(req, res){
    
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] == ""){
                return res.send('Please, fill all fields!')
            }
        }

        Student.create(req.body, function(students) {
            return res.redirect(`/estudantes/${students.id}`)
        })
    },   
    show(req, res){
        Student.find(req.params.id, function(student){
            if (!student) return res.send("Instructor no found!")

            student.birth = date(member.birth).birthDay
            student.subjects_taught = student.subjects_taught.split(",")
            student.created_at = date(student.created_at).format
            student.education_level = graduation(student.education_level)

            return res.render("estudantes/show.njk", { student })
        })    
    },                
    edit(req, res){
        Student.find(req.params.id, function (student){
            if (!student) return res.send("Instructor no found!")

            student.birth = date(student.birth).iso

            return res.render("estudantess/edit", { student })
        })
    },   
    put(req, res){
        
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all fields!")
            }
        }

        Student.update(req.body, function() {
            return res.redirect(`/estudantes/${req.body.id}`)
        })
    },   
    delete(req, res){
        Student.delete(req.body, function(){
            return res.redirect(`/estudantes`)
        })
    }   
}
