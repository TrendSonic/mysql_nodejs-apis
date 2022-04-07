const express = require('express');
const customers = require('./customers')
var app = express();

app.listen(3000, () => console.log('Express server is runnig at port no : 3000'));


// Get all customers
app.get('/customers', (req, res) => {
    res.json(customers.getAllCustomers(req))
});

// Get a customer
app.get('/customer/:id', async (req, res) => {
    res.json(await customers.getCustomer(req))
});

// Add new customer
app.post('/customers/add', (req, res) => {
    res.send('Succesfully added')
    res.json(customers.addCustomer(req))
});

// Delete a customer
app.delete('/customers/delete', (req, res) => {
    res.send('Succesfully deleted')
    res.json(customers.deleteCustomer(req))
});

// Update customer info
app.put('/customers/update/:id', async (req, res) => {
    res.send('Customer succesfully updated.')
    res.json(await customers.updateCustomer(req))
})