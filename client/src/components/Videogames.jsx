import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import VideogameCard from './VideogameCard';
import Searcher from './Searcher';
import { getGamesAction, getNextAction,getPrevAction,sortGamesAction,filterGamesAction} from '../redux/videogamesDucks';
import { Link } from 'react-router-dom';

export default function Videogames(){
    const games = useSelector(store=>store.games.page);
    const pages = useSelector(store=>store.games.pageLimit);
    const current = useSelector(store=>store.games.currentPage);
    const dispatch=useDispatch();

    const [order,setOrder]= useState("");
    const [filter,setFilter]=useState("");

    function startGames(){
        if(games.length===0){
            dispatch(getGamesAction());
        }
    }
    async function handleSortingChange(e){
        await setOrder(e.target.value);
    }
    async function handleFilterChange(e){
        await setFilter(e.target.value);
    }
    useEffect(()=>{
        startGames();
    },[])
    useEffect(()=>{
        dispatch(filterGamesAction(filter));
        dispatch(sortGamesAction(order));
    },[order,filter])

    return (<>
    <div className="filter-sorter">
        <label>
            Order by:&nbsp;
            <select value={order} onChange={handleSortingChange}>
                <option value="">Select an option</option>
                <option value="alphabeticasc">alphabetic +</option>
                <option value="alphabeticdesc">alphabetic -</option>
                <option value="ratingasc">rating +</option>
                <option value="ratingdesc">rating -</option>
            </select>
        </label>
        <label>
            Filter by:&nbsp;
            <select value={filter} onChange={handleFilterChange}>
                <option value="">Select an option</option>
                <option value="all">None</option>
                <option value="creator">Created by user</option>
                <option value="xbox">Xbox</option>
                <option value="playstation">PlayStation</option>
                <option value="nintendo">Nintendo</option>
                <option value="pc">PC</option>
            </select>
        </label>
    </div>
    <div className="game-panel"></div>
    {
        games.length!==0?games.map(game=><Link to={`/videogames/${game.id}`} key={game.id}><VideogameCard name={game.name} image={game.background_image}></VideogameCard></Link>):""
    }
    <p>Pages {pages}</p>
    <p>Current {current}</p>
    {
        current>1?<input type="button" onClick={()=>dispatch(getPrevAction())} value="prev"></input>:""
    }
    <Searcher></Searcher>
    {
        current<pages?<input type="button" onClick={()=>dispatch(getNextAction())} value="next"></input>:""
    }
    </>)

}


