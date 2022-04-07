const express = require('express');
const customers = require('./customers')
var app = express();

app.listen(3000, () => console.log('Express server is runnig at port no : 3000'));

// these two lines are needed for req.body
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Get all customers
app.get('/customers', async (req, res) => {
    res.json(await customers.getAllCustomers(req))
});

// Get a customer
app.get('/customer', async (req, res) => {
    res.json(await customers.getCustomer(req))
});

// Add new customer
app.post('/customers/add', (req, res) => {
    res.json(customers.addCustomer(req))
});

// Delete a customer
app.delete('/customers/delete', (req, res) => {
    res.json(customers.deleteCustomer(req))
});

// Update customer info
app.put('/customers/update/:id', async (req, res) => {
    res.json(await customers.updateCustomer(req))
})