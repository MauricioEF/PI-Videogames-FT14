const { Router } = require('express');
const router = Router();
require('dotenv').config();
const {API_KEY} = process.env;
const axios = require('axios');
const {Videogame} = require('../db');
const { Op } = require("sequelize");

let numPages;
router.get('/',async(req,res)=>{
    const query = req.query.name.toLowerCase().replace("%"," ");
    let limit = 15;
    let newArr1 = [];
    if(query){
        //first database games
        const dbgames = await Videogame.findAll({where:{name:{[Op.like]:`%${query}%`}}});
        newArr1 = dbgames.slice(0,limit);
        limit-=dbgames.length;
        //then api games
        const games = await axios.get(`https://api.rawg.io/api/games?search=${query}&key=${API_KEY}`);
        let newArr2 = games.data.results.slice(0,limit);
        let newArr3 =newArr1.concat(newArr2);
        res.status(200).json(newArr3);
    }
    else{
        const dbgames = await Videogame.findAll();
        newArr1-=dbgames.length;
        const games = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
        let newArr2 = games.data.results.slice(0,limit);
        let newArr3 = newArr1.concat(newArr2);
        res.status(200).json(newArr3);
    }
}).get('/page/:pageId',(req,res)=>{

})



module.exports= router;