import React from 'react';
import logo from '../Assets/LogoSinergia.png';

const Header =(props)=>{
    return(
        <div className="HeaderSinergia fixed-top">
            <div className="collapse bg-dark" id="navbarHeader">
                <div className="container">
                <div className="row">
                    <div className="col-sm-8 col-md-7 py-4">
                    <h4 className="text-white">Sinergia</h4>
                    <p className="text-white">Reto tecnico Endava. Aplicación que permita buscar las peliculas proporcionadas en la base de datos dada.</p>
                    </div>
                    <div className="col-sm-4 offset-md-1 py-4">
                    <h4 className="text-white">Integrantes</h4>
                    <ul className="list-unstyled">
                        <li className="text-white">Juan Calderón</li>
                        <li className="text-white">Cesar Rojas</li>
                        <li className="text-white">Sebastián Carrero</li>
                        <li className="text-white">Santiago Ramirez</li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
            <div className="navbar shadow">
            <div className="container d-flex justify-content-between">
            <div className="d-flex justify-content-start">
                <div className="dropdown">
                <button className="btn dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Géneros
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <button className="dropdown-item" value="Comedy" type="button" onClick={props.OrgGenre}>Comedy</button>
                    <button className="dropdown-item" value="Adventure" type="button" onClick={props.OrgGenre}>Adventure</button>
                    <button className="dropdown-item" value="Children" type="button" onClick={props.OrgGenre}>Children</button>
                    <button className="dropdown-item" value="Animation" type="button" onClick={props.OrgGenre}>Animation</button>
                    <button className="dropdown-item" value="Fantasy" type="button" onClick={props.OrgGenre}>Fantasy</button>
                    <button className="dropdown-item" value="Romance" type="button" onClick={props.OrgGenre}>Romance</button>
                    <button className="dropdown-item" value="Action" type="button" onClick={props.OrgGenre}>Action</button>
                    <button className="dropdown-item" value="Crime" type="button" onClick={props.OrgGenre}>Crime</button>
                    <button className="dropdown-item" value="Thriller" type="button" onClick={props.OrgGenre}>Thriller</button>
                    <button className="dropdown-item" value="Drama" type="button" onClick={props.OrgGenre}>Drama</button>
                    <button className="dropdown-item" value="Horror" type="button" onClick={props.OrgGenre}>Horror</button>
                    <button className="dropdown-item" value="Sci-Fi" type="button" onClick={props.OrgGenre}>Sci-Fi</button>
                    <button className="dropdown-item" value="Mystery" type="button" onClick={props.OrgGenre}>Mystery</button>
                    <button className="dropdown-item" value="Film-Noir" type="button" onClick={props.OrgGenre}>Film-Noir</button>
                </div>
                </div>
        
                <div className="dropdown">
                <button className="btn dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Organizar
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <button className="dropdown-item" type="button" onClick={props.OrgRating}>Raiting</button>
                    <button className="dropdown-item" type="button" onClick={props.OrgAZ}>A-Z</button>
                </div>
                </div>
            </div>
            <nav className="navbar" >
                <form className="form-inline search">
                <input className="form-control mr-lg-2" onChange={props.SearchMovie} type="search" placeholder="Búscar..." aria-label="Search"/>
                </form>
            </nav>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                <span></span><img src={logo} alt="Logo Sinergia"width="30" height="30" ></img>
            </button>
            </div>
        </div>
        </div>
    );
}

export default Header;

