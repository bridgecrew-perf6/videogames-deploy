import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getVideogameByName } from '../../../actions/index.js';
import './SearchBar.css';

export default function SearchBar(){
    const [name, setName] = useState('')
    const dispatch = useDispatch();

    function handleOnChange(e){
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getVideogameByName(name))
        setName('')
    };

    function handleKeyPress(e){
        if(e.key === 'Enter'){
            handleSubmit(e);
        }
    }

    return (
        <div className="nav">
            <div>
                <h1 className='h1'>Videogames App</h1>
                <input className="input"
                    type="text"
                    placeholder="Videogame search..."
                    value={name}
                    onChange={e => handleOnChange(e)}
                    onKeyPress={e => handleKeyPress(e)}
                />
                <button className="input"
                type="submit"
                onClick={e => handleSubmit(e)}
                >Search</button>
            </div>
        </div>
    )
};
