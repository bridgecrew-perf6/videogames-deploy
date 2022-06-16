import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterVideogamesByGenre } from '../../../../actions';
import './ByGenre.css';

export default function ByGenre(){

    const genres =  useSelector(state => state.genres);

    const dispatch = useDispatch();

    function handleOnChange(e){
        e.preventDefault()
        dispatch(filterVideogamesByGenre(e.target.value))
    }

    return (
        <div>
            <div className= "label">Genre</div>
            <select className="select" onChange={e => handleOnChange(e)}>
                <option value="All">All</option>
                {genres && genres.map((e, i) => <option value={e.name} key={i}>{e.name}</option>)}
            </select>
        </div>
    )
}
