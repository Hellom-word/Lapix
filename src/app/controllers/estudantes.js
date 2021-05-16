const { age, date, grade } = require('../../lib/utils')
const Student = require('../models/Student')

module.exports = {
    index(req, res){

        let {filter, page, limit } = req.query

        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(students){

                const pagination = {
                    total: Math.ceil(students[0].total / limit),
                    page
                }
                return res.render("estudantes/index", { students, pagination, filter })
            }
        }

        Student.paginate(params)
    },
    create(req, res){
        Student.teacherSelectOptions(function(options){
            return res.render('estudantes/create', {teacherOptions: options})
        })
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

            student.birth = date(student.birth).birthDay
            student.desired_skills = student.desired_skills.split(",")
            /* student.created_at = date(student.created_at).format */
            student.education_level = grade(student.education_level)

            return res.render("estudantes/show.njk", { student })
        })    
    },                
    edit(req, res){
        Student.find(req.params.id, function (student){
            if (!student) return res.send("Instructor no found!")

            student.birth = date(student.birth).iso

            Student.teacherSelectOptions(function(options){
                return res.render('estudantes/edit', {student, teacherOptions: options})
            })
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
        Student.delete(req.body.id, function(){
            return res.redirect(`/estudantes`)
        })
    }   
}
