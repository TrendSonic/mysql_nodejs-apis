const { ConnectContactLens } = require('aws-sdk');
const SQL = require('./db')

module.exports = {
	getAllCustomers: async () => {
		const check = "SELECT * FROM customers";
		return await SQL(check)
	},
	getCustomer: async (req) => {
		if(req.body.id == undefined || isNaN(req.body.id)) {
			console.log("Please provide a valid id")
		}
		const check = 'SELECT * FROM customers WHERE id = ?'
		return await SQL(check, [req.body.id])
	},
	addCustomer: async (req) => {
    var check = 'INSERT INTO customers (name, address) VALUES (?, ?)';
		return await SQL(check, [req.body.name, req.body.address])
	},
	deleteCustomer: async (req) => {
		const check = 'DELETE FROM customers WHERE id = ?'
		return await SQL(check, [req.body.id])
	},
	updateCustomer: async (req, res) => {    
		const check = `UPDATE customers SET name = ?, address = ? WHERE id = ${req.params.id}`
		return await SQL(check, [req.body.name, req.body.address])
	}
}

	// this is working with req.body
	// updateCustomer: async (req, res) => {
	// 	const myName = req.body.name
  //   const myAddress = req.body.address
    
	// 	const sql = `UPDATE customers SET name = '${myName}', address = '${myAddress}' WHERE id = ${req.params.id}`

	// 	con.query(sql, [req.params.id], (err, data) => {
	// 		if(err) {
	// 			console.log(err)
	// 		} else {
	// 			console.log('Customer succesfully updated.')
	// 		}
	// 	})
	// }


	// PROMISES
		// return new Promise((res, rej) => {
		// 	con.query(sql, (err, data) => {
		// 		return err ? rej(err) : res(data)
		// });
		// });

		// return new Promise((res, rej) => {
		// 	con.query(sql, [req.params.id], (err, data) => {
		// 		if(data.length < 1) {
		// 			return 'This user does not exist'
		// 		} else {
		// 			return err ? rej(err) : res(data)
		// 		}
		// 	})
		// })