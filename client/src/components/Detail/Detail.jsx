import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getVideogameById, clearState } from '../../actions';
import './Detail.css';
import gaming from '../../images/gaming.gif'
import load from '../../images/load.gif';

export default function Detail(){
    const { id } = useParams();
    const dispatch = useDispatch();
    const details = useSelector(state => state.details);

    const { name, image, description, genres, platforms, rating, released } = details;
    useEffect(() => {
        dispatch(getVideogameById(id))
        return () => {
            dispatch(clearState())
        }
    }, [dispatch, id]);

    return (
        <div className="body1">
            <div className="separate">
                <h3>
                    <a className="tohome" href="http://localhost:3000/home">To home</a>
                </h3>
            </div>
            {details.name ? (<div>
                <h1 className= "name">{name}</h1>
                <h4>Release Date: {released}</h4>
                <h4>Rating: {rating}</h4>
                <div>
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
                <div className='image'>
                    <img className='image' src={image?image:gaming} alt="Img not found"  width="300px" height="300px"/>
                </div>
                <h4 className='description'>Description: {description}</h4>
                <div className='platforms'> <h2>Platforms</h2>
                    {platforms?.map(t => {
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
            </div>) :
                <div className='carga'>
                    <img src={load} alt="img not found" width="750px" height="750px"/>
                </div>}
        </div>
    )
}
