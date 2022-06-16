import React from "react";
import './Paginated.css';

export default function Paginated({ videogamesPerPage, allVideogames, paginado }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allVideogames.length / videogamesPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav className="nav">
            {pageNumbers &&
            pageNumbers.map((number) => (
                <div className="page" key={number}>
                    <button className="pagin" onClick={() => paginado(number)}>{number}</button>
                </div>
            ))}
        </nav>
    );
}
