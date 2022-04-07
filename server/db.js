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

const SQL = (query, params = []) => {
    return new Promise((resolve, reject) => {
        con.query(query, params,  function(err, res) {
            if(err) reject(err)
            resolve(res)
        })
    })
}

module.exports = SQL