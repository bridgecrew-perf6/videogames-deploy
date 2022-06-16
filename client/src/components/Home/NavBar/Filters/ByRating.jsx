import React from 'react';
import { useDispatch } from 'react-redux';
import { orderByRating } from '../../../../actions';

export default function ByRating(){

    const dispatch = useDispatch();

    function handleOnChange(e){
        e.preventDefault()
        dispatch(orderByRating(e.target.value))
    }

    return(
        <div>
            <div className="label">By Rating</div>
            <select className="select" onChange = {e => handleOnChange(e)}>
                <option value="All">All</option>
                <option value="Asc">Ascending order</option>
                <option value="Desc">Descending order</option>
            </select>
        </div>
    )
}