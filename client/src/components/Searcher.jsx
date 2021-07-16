import React from 'react';
import { useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { getGamesAction } from '../redux/videogamesDucks';
export default function Searcher(){
    const dispatch= useDispatch();
    const [search,setSearch]=useState("");
    function handleChange(e){
        setSearch(e.target.value);
    }
    function searchGame(game){
        dispatch(getGamesAction(game))
    }
    function submit(){
        searchGame(search);
        setSearch("");
    }
    useEffect(()=>{
        console.log(search);
    },[search])
    return(<>
        <input className="searchinput" onChange={handleChange}/>
        <input type="submit" onClick={submit}></input>
    </>)
}