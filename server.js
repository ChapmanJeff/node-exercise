const express = require('express')
const bodyParser = require('body-parser')
const port = process.env.port || 8080;
const axios = require('axios');
const api = require('./utils/api')

const app = express();

//Express Middleware
app.use(bodyParser.json());


//Endpoints
app.get('/character/:name', api.getCharacter)

app.get('/characters', api.get50Characters)

'/characters'
'/planetresidents'

//Port
app.listen(port, () =>
  console.log(`Listening on port ${port}`)
)
