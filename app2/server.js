'use strict';

const request = require("request");
const express = require('express');

// Constants
const Port = process.env.Port || 8080;

// App
const app = express();
app.get('/', (req, res) => {
  return res.send(`Thanks for buying a Unicorn 🦄`);
});

app.listen(Port);
console.log(`Running on port :${Port}`);