import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage(){
    return (
        <div className="landing">
            <link href='https://fonts.googleapis.com/css?family=Vibur:400' rel='stylesheet' type='text/css'/>
            <h1 className="text">Videogames App</h1>
            <Link className="link" to = './home'>
                <button className="button">Enter</button>
            </Link>
        </div>
    )
};
