const { createInvoice } = require("./createInvoice.js");

const express = require('express');
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:false}));

app.get('/', (req, res) => {
    res.send(200);
});

app.post('/', (req, res) => {
    console.log(req.body);
    res.send('It is beating');

    const invoice = req.body;

    console.log(invoice);
  
    createInvoice(invoice, "sample-request.pdf");
});

app.listen(3000, () => {
    console.log('Server is running')
})