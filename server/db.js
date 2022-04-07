const mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydb',
    multipleStatements: true
});

con.connect((err) => {
    if(!err){
        console.log('DB connection succeded.');
    } else{
        console.log('DB connection failed');
    }
});

module.exports = con