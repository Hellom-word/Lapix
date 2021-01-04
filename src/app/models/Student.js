const { age, date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    all(callback){

        db.query(`SELECT * FROM students`, function(err, results){
            if(err) throw `database Error! ${err}`

            callback(results.rows)
        })

    },
    create(data, callback){



        const query = `
                INSERT INTO students (
                    avatar_url,
                    name,
                    email,
                    birth,
                    education_level,
                    workload,
                    desired_skills,
                ) VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING id
            `

            const values = [
                data.avatar_url,
                data.name,
                data.email,
                date(data.birth).iso,
                data.education_level,
                data.workload,
                data.desired_skills,
            ]

            db.query(query, values, function (err, results){
                if(err) throw `database Error! ${err}`

                callback(results.rows[0])
            })
    
    },
    find(id, callback) {`
            SELECT *
            FROM students
            WHERE id = $8`, [id], function(err, results){
                if(err) throw `database Error! ${err}`
            
                callback(results.rows[0])
            }
    },
    update(data, callback) {

            /*         avatar_url 
    name
    email
    birth
    education_level
    workload
    desired_skills */

        const query = `
        UPDATE instructors SET
            avatar_url=($1),
            name=($2),
            email,($3)
            birth=($4),
            education_level=($5),
            workload=($6),
            desired_skills=($7),
        WHERE id =($8)
        `
        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth).iso,
            data.education_level,
            data.workload,
            data.desired_skills
        ]

        db.query(query, values, function(err, results){
            if(err) throw `database Error! ${err}`

            callback()
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM students WHERE id = $1`, [id], function(err, results){
            if(err) throw `Database Error! ${err}`

            return callback()
        })
    }

}