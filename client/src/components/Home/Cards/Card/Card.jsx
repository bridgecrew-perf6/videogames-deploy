import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';
import img from '../../../../images/gaming.gif'
import { deleteGame } from '../../../../actions';
import { useDispatch } from 'react-redux';

export default function Card({image, name, genres, id, rating}){

    const dispatch = useDispatch();
    function handleClick(e, id) {
        e.preventDefault();
        dispatch(deleteGame(id));
    }

    return(
        <div className="card">
            <nav className='card-body'>
                <Link className="link-title" to={`videogames/${id}`}>
                    <h1 className="card-title">{name.replace(name[0], name[0].toUpperCase())}</h1>
                </Link>
            </nav>
            <div className="list-item">
                {genres?.map(t => {
                    if(typeof(t) === 'string'){
                        return (
                        <div key={t}>
                            <span className="type">
                                {t.replace(t[0], t[0].toUpperCase())}
                            </span>
                        </div>
                    )}
                    else{
                        return (
                            <div key={t.name}>
                                <span>
                                    {t.name}
                                </span>
                            </div>
                        )
                    }
                })}
            </div>
            <div>
                <h6>Rating: {rating}</h6>
            </div>
            <div>
                <img className="img" src={image ? image : img } alt="No se encontró la imagen"  width="150px" height="150px"/>
            </div>
            <div>
                {id.length > 10 ? <button onClick = {e => handleClick(e, id)}>Delete game</button> : null}
            </div>
        </div>
    )
};
