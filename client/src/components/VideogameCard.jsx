import React from 'react';
import './VideogameCard.css';

export default function VideogameCard(props){
    return(
        
        <div className="gamecard">
            <img src={props.image} className="gamecard__image" alt={props.name+".png"}/>
            <p className="gamecard__title">{props.name}</p>
            {props.genres.length>0?props.genres.map(genre=><span className="gamecard__genres">{genre.name}&nbsp;</span>):"No genres"}
        </div>
    )
}