const con = require('./db')

module.exports = {
	getAllCustomers: () => {
		const sql = "SELECT * FROM customers";
		return new Promise ((res, rej) => {
			con.query(sql, (err, data) => {
				console.log(data)
				return err ? rej(err) : res('data')
		});
	});
	},
	getCustomer: async (req) => {
		if(req.params.id == undefined || isNaN(req.params.id)) {
			console.log("Please provide a valid id")
		}

		const customer_id = req.params.id

		const sql = 'SELECT * FROM customers WHERE id = ?'
    con.query(sql, [customer_id], (err, data) => {
			if(data.length < 1) {
				console.log("This user does not exist")
			} else {
				console.log(data)
			}
    })
	},
	addCustomer: (req) => {
		const name = req.body.name
    const address = req.body.address
    var sql = `INSERT INTO customers (name, address) VALUES ('${name}', '${address}')`;
    con.query(sql, (err) => {
			console.log('Succesfully added.')
    })
	},
	deleteCustomer: (req) => {
		const id = req.body.id
		const sql = `DELETE FROM customers WHERE id = '${id}'`
    con.query(sql, id, (err, data) => {
        if(err) {
					console.log(err)
				} else {
					console.log('Succesfully deleted.')
				}
    })
	},
	updateCustomer: async (req, res) => {
		const myName = req.body.name
    const myAddress = req.body.address
    
		const sql = `UPDATE customers SET name = '${myName}', address = '${myAddress}' WHERE id = ${req.params.id}`

		con.query(sql, [req.params.id], (err, data) => {
			if(err) {
				console.log(err)
			} else {
				console.log('Customer succesfully updated.')
			}
	})
	}
}