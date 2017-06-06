const express = require('express')
const bodyParser = require('body-parser')
const port = process.env.port || 8080;
const api = require('./utils/api')

const app = express();

app.set('view engine', 'ejs');


//Express Middleware
app.use(bodyParser.json());


//Endpoints
app.get('/', (req,res)=>{res.render('index')})

app.get('/character/:name', api.getCharacter)

app.get('/characters', api.get50Characters)

app.get('/planetresidents', api.planetResidents)


//Port
app.listen(port, () =>
  console.log(`Listening on port ${port}`)
)
