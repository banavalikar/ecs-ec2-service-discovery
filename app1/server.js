'use strict';

const rq = require("request");
const exp = require('express');
const agent = require('service-agent');

// Constants
const Port = process.env.Port || 8080;
const Unicorn = process.env.Unicorn;

// App
const app = exp();
app.get('/', (req, res) => {
  return res.send(`<h1>You can send Unicorn orders from here 💰. Add /buy-a-unicorn-from-app2 to the url to buy.</h1>`);
});

app.get('/buy-a-unicorn-from-app2', (req, res) => {
var options = { method: 'GET',
  url: `http://${Unicorn}`,
  headers: 
   { 'cache-control': 'no-cache' } };

const request = rq.defaults({
    agentClass: agent,
    agentOptions: {service: ''},
    pool: {}    
})

request(options, function (error, response, body) {
  if (error) {
    return res.send(error.message);
  }
  console.log('Calling ' + options.url);
  return res.send(body);
});

});

app.listen(Port);
console.log(`Running on port :${Port}`);