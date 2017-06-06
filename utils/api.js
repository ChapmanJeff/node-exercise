const axios = require('axios');


 module.exports = {
   getCharacter (req, res) {
     const name = req.params.name;
     console.log(name);
     return axios.get(`http://swapi.co/api/people/?search=${name}`)
     .then(characterInfo => res.status(200).send(characterInfo.data.results))
     .catch((err)=> console.log(err))
   },

   get50Characters (req, res) {
     const sortBy = req.query.sort;
     var results = [];
     var page = 1;
     function a () {
       return axios.get(`http://swapi.co/api/people/?page=${page}`)
       .then((people)=>{
         console.log(1.1,page)
         results = results.concat(people.data.results)
        //  console.log(1.2,results)
         if (page < 5) {
           console.log(1,results.length)
           console.log(page)
           ++page;
           console.log(page)
           return a(page);
         }
         console.log(2,results.length)
         return results
       })
     }
     axios.all([a()]).then((result)=>{
       if (!sortBy) {
         res.status(200).send(result[0])
       }
       if (sortBy.toLowerCase() === 'name') {
          res.status(200).send(result[0].sort((personA, personB)=>{
            if (personA[sortBy] < personB[sortBy]) return -1;
            if (personA[sortBy] > personB[sortBy]) return 1;
            return 0;
          }))
        } else {
          res.status(200).send(result[0].sort((a,b)=> a[sortBy] - b[sortBy]))
        }
     })
     .catch((err)=> console.log(err))

    //  const sortBy = req.query.sort;
    //  console.log(sortBy);
    //  return axios.get('http://swapi.co/api/people')
    //  .then((people)=>{
    //    const peeps = people.data.results;
    //    if (sortBy.toLowerCase() === 'name') {
    //      res.status(200).send(peeps.sort((personA, personB)=>{
    //        if (personA[sortBy] < personB[sortBy]) return -1;
    //        if (personA[sortBy] > personB[sortBy]) return 1;
    //        return 0;
    //      }))
    //    } else {
    //      res.status(200).send(peeps.sort((a,b)=> a[sortBy] - b[sortBy]))
    //    }
    //  })
    //  .catch(console.log(new Error('there was an err')))
   }

 }
