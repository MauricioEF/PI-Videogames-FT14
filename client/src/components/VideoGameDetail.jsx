import React, {useEffect, useState} from 'react';
import { useSelector} from 'react-redux';
import axios from 'axios';

export default function VideoGameDetail(props){
    const games = useSelector(store=>store.games.gamesArray);
    const [game,setGame]=useState({})
    async function filter(gameId){
        let gameresult = games.filter(game=>game.id==gameId)
        if(gameresult.length>0){
            //filter db/api
            let gameDetails = await axios.get(`http://localhost:3001/videogame/${gameresult[0].id}`)
            setGame(gameDetails.data);
            console.log(gameDetails.data);
            return gameDetails.data;
        }
        else{
            return null;
        }
    }
    useEffect(()=>{
        filter(props.match)
    },[])
    
    return(
        <div>
            <p>{(game)!==null&&Object.entries(game).length!==0?`${game.name}`:""}</p>
            <p>{(game)!==null&&Object.entries(game).length!==0?`${game.description.replace('<p>','').replace('</p>','').replace('<br />','')}`:""}</p>
            <p>{(game)!==null&&Object.entries(game).length!==0?`${game.background_image?game.background_image:""}`:""}</p>
            {
                (game)!==null&&Object.entries(game).length!==0?game.platforms.map(platform=><p>{platform.platform.name}</p>):""    
            }
            <p>{(game)!==null&&Object.entries(game).length!==0?`${game.rating}`:""}</p>
            {
                (game)!==null&&Object.entries(game).length!==0?game.genres.map(genre=><p>{genre.name}</p>):""
            }
        </div>
    )
}