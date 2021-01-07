'use strict';

const rq = require("request");
const exp = require('express');
const agent = require('service-agent');

// Constants
const Port = process.env.Port || 8080;
const App2 = process.env.APP_2;

// App
const app = exp();
app.get('/', (req, res) => {
  return res.send(`Hello from App1`);
});

app.get('/send-get-to-app2', (req, res) => {
var options = { method: 'GET',
  url: `http://${App2}`,
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