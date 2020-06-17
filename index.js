const express = require('express');

const app = express();
/* mocked DB balance */  
let balance = 0;

/* ENDPOINTS START */
app.post('/transferMoney', (req, res) => {
    balance += 100;
    res.status(200).send(`current balance: ${balance}`);
});
/* ENDPOINTS END */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server is running on ${PORT}`));