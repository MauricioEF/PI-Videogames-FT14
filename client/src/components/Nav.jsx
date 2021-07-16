import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
export default function Nav(){
    return(
        <div className="nav">
            <div className="nav__brand">
                <Link to="/">HOME</Link>
            </div>
            <div className="nav__menu">
                
            </div>
            <div className="nav__search">
            <Link to="/videogame/create">CREAR JUEGO</Link>
            </div>
        </div>
    )
}