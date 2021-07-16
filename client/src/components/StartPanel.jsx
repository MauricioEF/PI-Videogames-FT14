import React, { useEffect } from 'react';
import './StartPanel.css';
import ControlImage from '../images/Control.png';
import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getGamesAction, getGenresAction} from '../redux/videogamesDucks';
export default function StartPanel(){
    const dispatch= useDispatch();
     useEffect(async ()=>{
        await dispatch(getGamesAction());
        await dispatch(getGenresAction());
    },[])
    return (
        <>
        <div className="wallpaper">
            <div className="gradient">
                <p className="title">Video games webapp</p>
            </div>
            <div className="start">
                <Link to='/'><p className="start__text"> Start </p></Link>
                <Link to ='/'><img src={ControlImage} alt="control" className="control-image"/></Link>
            </div>
        </div>
        </>
    )
}