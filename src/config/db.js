const { Pool } = require("pg")

    module.exports = new Pool({
        user: 'hellom',
        password: "shanti0408",
        host: "localhost",
        port: 5432,
        database: "my_teacher"  
        })