import React from 'react';
import { useDispatch } from 'react-redux';
import { orderByName } from '../../../../actions';
import './AlphabeticalOrder.css';

export default function AlphabeticalOrder(){
    const dispatch = useDispatch();    

    function handleOnChange(e){
        e.preventDefault()
        dispatch(orderByName(e.target.value))
    };

    return(
        <div className="alpha">
            <div className="label">Alphabetical Order</div>
            <select className="select" onChange={e => handleOnChange(e)}>
                <option value="All">All</option>
                <option value="Asc">Asc</option>
                <option value="Desc">Desc</option>
            </select>
        </div>
    )
}
