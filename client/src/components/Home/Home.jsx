import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cards from './Cards/Cards';
import './Home.css';
import ByCreation from './NavBar/Filters/ByCreation';
import ByGenre from './NavBar/Filters/ByGenre';
import ByRating from './NavBar/Filters/ByRating';
import SearchBar from './NavBar/SearchBar';
import AlphabeticalOrder from './NavBar/Filters/AlphabeticalOrder';
import { getGenres, getVideogames } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import Paginated from './Paginated/Paginated';

export default function Home(){
    const allVideogames = useSelector(state => state.videogames);

    //console.log(allVideogames);

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage] = useState(15);
    const indexOfLastVideogame = currentPage * videogamesPerPage;
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame);

    if(currentPage > Math.ceil(allVideogames.length/videogamesPerPage) && currentPage !== 1){
        setCurrentPage(1);
    }

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        dispatch(getVideogames())
        dispatch(getGenres())
    },[dispatch])

    function handleClick(e){
        e.preventDefault()
        dispatch(getVideogames())
    };

    return(
        <div className="body">
            <div className="search">
                <SearchBar />
            </div>
            <button className="create">
                <Link className="link" to="/videogame">Create the Videogame of your dreams</Link>
            </button>
            <div>
                <button className="reload" onClick={e => handleClick(e)}>Reload Videogames</button>
            </div>
            <div className="filters">
                <ByGenre paginado={paginado}/>
                <ByCreation/>
                <AlphabeticalOrder/>
                <ByRating/>
            </div>
            <div className="paginated">
                <Paginated
                    videogamesPerPage={videogamesPerPage}
                    allVideogames={allVideogames}
                    paginado={paginado}
                />
            </div>
            <div>
                <Cards allVideogames={currentVideogames}/>
            </div>
        </div>
    )
}
