import React, {useState, useEffect} from 'react';
import {Api_Key, Search_Movie_ID} from '../Includes/ConfigApi';
const beginning = "https://image.tmdb.org/t/p/w342";

const CardC = (props) => { 
    const [MovieFetchPath, setPath] = useState(null);
    const [Generos, setGeneros] = useState([]);

    useEffect(()=>{
        async function CargarPoster(endpoint){
            try {
                await fetch(endpoint)
                .then(res => res.json())
                .then(json => { setPath(json.poster_path)})
                .catch(error =>{
                    console.log(error);
                });
            } catch (error) {
                console.log(error);
            }
        }
        let url ="".concat(Search_Movie_ID,props.pelicula,'?api_key=', Api_Key);
        CargarPoster(url)
        ArregloGeneros();
    },[])
       
    const ArregloGeneros =()=>{
        let generosaux = props.genero.split('|');
        setGeneros(generosaux);
    }

    return(
            <div data-testid="cardMovie" className="col-md-4">
                <div className="card mb-4 sombra">
                    { MovieFetchPath ?  
                        <img alt={props.pelicula}
                        width="100%" height="342"
                        src={beginning + MovieFetchPath}/>
                     :         
                        <div className="d-flex justify-content-center mb-5 mt-5 pt-5 pb-5">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    }
                <div className="card-body">
                    <p className="card-text h5"><em>{props.titulo}</em></p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <button type="button" className="btn btn-warning btn-sm"><span>Rating: </span>{props.rating}</button>
                        </div>
                        <div className="dropdown">
                            <button className="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Generos
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                {
                                    Generos.map((genero, index) =>{
                                        return(
                                            <small key={index} className="dropdown-item">{genero}</small>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
    );
}

export default CardC;