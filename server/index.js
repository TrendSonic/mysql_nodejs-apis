const mysql = require('mysql');
const express = require('express');
var app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydb',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if(!err){
        console.log('DB connection succeded.');
    } else{
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
    }
});


app.listen(3000, () => console.log('Express server is runnig at port no : 3000'));


// Get all customers
app.get('/customers', (req, res) => {
    const sql = "SELECT * FROM customers";
    mysqlConnection.query(sql, (err, data) => {
        if(!err){
            res.send(data);
        } else{
            console.log(err);
        }
    })
});

// Get a customer
app.get('/customer/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM customers WHERE id = ?', [req.params.id], (err, data) => {
        if (!err)
            res.send(data);
        else
            console.log(err);
    })
});

// Add new customer
app.post('/customers/add', (req, res) => {
    const name = req.body.name
    const address = req.body.address
    var sql = `INSERT INTO customers (name, address) VALUES ('${name}', '${address}')`;
    mysqlConnection.query(sql, (err) => {
        if (!err)
            res.send('Inserted customer');
        else
            console.log(err);
    })
});

// Delete a customer
app.delete('/customers/:id', (req, res) => {
    const sql = 'DELETE FROM customers WHERE id = ?'
    mysqlConnection.query(sql, [req.params.id], (err) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

// Update customer info
app.put('/customers/:id', (req, res) => {
	const myName = req.body.name
    const myAddress = req.body.address
    
	const sql = `UPDATE customers SET name = '${myName}', address = '${myAddress}' WHERE id = ${req.params.id}`

	mysqlConnection.query(sql, [req.params.id], (err) => {
		if(!err) {
			res.send('Updated')
		} else {
			console.log(err)
		}
	})
})