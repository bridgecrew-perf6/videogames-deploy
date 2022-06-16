import React from 'react';
import Card from './Card/Card';
import './Cards.css';
import image from '../../../images/Loadin.gif';


export default function Cards({allVideogames}){
    //console.log(allVideogames);
    return (
        <div className='cards'>
            {allVideogames.length !== 0 ? allVideogames.map((videogame, i) => (
                <Card
                    key={i}
                    rating={videogame.rating}
                    id={videogame.id}
                    image={videogame.image}
                    name={videogame.name}
                    genres={videogame.genres}
                />
            )):
            <div className="container">
                <img src={image} alt="Img" width="497px" height="497px"/>
            </div>
            }
        </div>
    )
}
