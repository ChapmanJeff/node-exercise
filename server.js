const express = require('express')
const bodyParser = require('body-parser')
const port = process.env.port || 8080;

cons app = express();

//Express Middleware
app.use(bodyParser.json());


//Endpoints
'/character/:name'
'/characters'
'/planetresidents'

//Port
app.listen(port, () =>
  console.log(`Listening on port ${port}`)
)
