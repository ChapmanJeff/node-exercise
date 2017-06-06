const axios = require('axios');


 module.exports = {
//
   getCharacter (req, res) {
     const name = req.params.name;
     console.log(name);
     return axios.get(`http://swapi.co/api/people/?search=${name}`)
     .then(characterInfo => {

       let character = characterInfo.data.results[0];
       //render ejs
       res.render('character',{
         character: character
       })
     })
     .catch((err)=> console.log(err))
   },

// Recursively Paginate through api requests to get 50 results (10 results per call)
   get50Characters (req, res) {
     const sortBy = req.query.sort;
     let results = [];
     let page = 1;
     function getAll50() {
       return axios.get(`http://swapi.co/api/people/?page=${page}`)
       .then((people)=>{
         console.log(1.1,page)
         results = results.concat(people.data.results)
         if (page < 5) {
           ++page;
           console.log(page)
           return getAll50(page);
         }
         console.log(2,results.length)
         return results
       })
     }
     axios.all([getAll50()]).then((result)=>{
       if (!sortBy) {
         res.status(200).send(result[0])
       }
       //sort alphabetically
       if (sortBy.toLowerCase() === 'name') {
          res.status(200).send(result[0].sort((personA, personB)=>{
            if (personA[sortBy] < personB[sortBy]) return -1;
            if (personA[sortBy] > personB[sortBy]) return 1;
            return 0;
          }))
          //sort by number
        } else {
          res.status(200).send(result[0].sort((a,b)=> a[sortBy] - b[sortBy]))
        }
     })
     .catch((err)=> console.log(err))
   },

// Map through planets and map through residents to get final answer
   planetResidents (req, res) {
     let results = {};
     return axios.get(`http://swapi.co/api/planets`)
     .then((planets)=> {
       let thePlanets = planets.data.results;

       let mapPlanets = thePlanets.map((planet)=>{
         results[planet.name] = [];
         let residents = planet.residents.map((resident)=>{
            return axios.get(resident)
            .then((residentInfo)=> {
              console.log(2,residentInfo.data.name)
              return residentInfo.data.name
            })
          })
          return axios.all(residents).then((residentsRes)=>{
            console.log(3,residentsRes)
            results[planet.name] = results[planet.name].concat(residentsRes)
            return 'added'
          })
       })

       return axios.all(mapPlanets).then(()=>{
         res.status(200).send(results)
       })
     })
     .catch((err)=> console.log(err))
   }

 }
