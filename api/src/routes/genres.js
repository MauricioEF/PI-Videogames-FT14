const {Router} = require('express');
const axios = require('axios');
require('dotenv').config();
const {API_KEY} = process.env;
const router = Router();


router.get('/',async(req,res)=>{
    var a = await Genre.findAll();
    if(a.length===0){
      var genres = await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)
      genres.data.results.forEach(genre=>{
         Genre.create({
          name: genre.slug
        })
      })
      res.status(200).send("Genres created successfully");
    }else{
  
      //filter by genre
      // var c = await axios(`https://api.rawg.io/api/games?key=${API_KEY}`);
      // newArr = c.data.results.filter(game=>{
      //   return game.genres.findIndex(genre=>genre.slug=='adventure')!=-1;
      // });
      // console.log(newArr);
    }
})

module.exports= router;