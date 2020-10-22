import React, { Component, Fragment } from 'react';
import { csv } from 'd3';
import data from '../Dataset/moviesMin.csv';
import links from '../Dataset/linksMin.csv';
import rating from '../Dataset/ratings.csv';
import Card from './Card'
import Home from './Home';
import Header from './Header';
/* import {Api_Key, Api_Url, Config, Base_Url, Search_Movie} from '../Includes/ConfigApi';

const query = "&query="; */

class ReadCsvComponent extends Component {

    state = {
        resultsLinks: null,
        resultsMovies: null,
        resultsMoviesFixed: null,
        resultsRating: null,
        RatingAverage: {
            movieId:[],
            Rating:[]
        }
     } 


     componentDidMount = async() => {
         try {
            await csv(data).then(info => {
                this.setState(
                    {
                        resultsMovies:info,
                        resultsMoviesFixed:info
                    }               
                )
            }).catch(error=>{
                console.log(error);
            });
            await csv(links).then(info => {
                this.setState(
                    {
                        resultsLinks:info,
                    }               
                )
            }).catch(error=>{
                console.log(error);
            });
            await csv(rating).then(info => {
                this.setState(
                    {
                        resultsRating:info,
                    }               
                )
            }).catch(error=>{
                console.log(error);
            });

         } catch (error) {
             console.log(error);
         }
         if(this.state.resultsRating){
            this.CalculaRating();
         }
     }


     CalculaRating=()=>{
        let auxAverage = {
            movieId:[this.state.resultsRating[0].movieId],
            Rating:[]
        }
        let a = true;
        for (let index = 0; index < (this.state.resultsRating.length-99493); index++) {
            a = auxAverage.movieId.includes(this.state.resultsRating[index].movieId);
            if (!a) {
                auxAverage.movieId.push(this.state.resultsRating[index].movieId)
            } 
        }
        function comparar ( a, b ){ return a - b; }
        auxAverage.movieId.sort(comparar);
        let cont = 0;
        let sum = 0;
        let media = 0;
        for (let index = 0; index < auxAverage.movieId.length; index++) {
            let Mid = auxAverage.movieId[index];
            sum = 0;
            cont = 0;
            for (let x = 0; x < (this.state.resultsRating.length-80000); x++) {
                let v = parseFloat(this.state.resultsRating[x].rating);
                if (Mid === this.state.resultsRating[x].movieId) {
                    sum = sum + v;
                    cont = cont + 1;
                }          
            }
            media = (sum/cont).toFixed(3);
            auxAverage.Rating.push(media);
        }
        this.setState({
            RatingAverage: auxAverage
        });
/*         console.log(this.state.RatingAverage);
        console.log(this.state.resultsMovies); */
     }

     OrganizaRating=()=>{
        let CopyMovie = this.state.resultsMovies.slice();
        let CopyMovieAux = [];
        let CopyRating = Object.assign({},this.state.RatingAverage); 
        let aux = null;
        let aux2 = null;
        let n, i, k;
        n = CopyRating.Rating.length;
        for (k = 1; k < n; k++) {
            for (i = 0; i < (n - k); i++) {
                if (CopyRating.Rating[i] < CopyRating.Rating[i+1]) {
                    aux = CopyRating.Rating[i];
                    aux2 = CopyRating.movieId[i];

                    CopyRating.Rating[i] = CopyRating.Rating[i+1];
                    CopyRating.movieId[i] = CopyRating.movieId[i+1];

                    CopyRating.Rating[i+1] = aux; 
                    CopyRating.movieId[i+1] = aux2;
                }
            }
        }
        this.setState({
            RatingAverage:CopyRating
        })

        let id;
        for (let index = 0; index < CopyRating.movieId.length; index++) {
            id = CopyRating.movieId[index];
            for (let i = 0; i < CopyMovie.length; i++) {
                if (CopyMovie[i].movieId === id) {
                    CopyMovieAux.push(CopyMovie[i]);
                }
            }
        }
        this.setState({
            resultsMovies:CopyMovieAux
        })
     }

     OrganizaAZ=()=>{
        let CopyMovie = this.state.resultsMovies.slice(); 
        let auxbandera = null;
        let aux = null;
        let n, i, k;
        n = CopyMovie.length;
        // Algoritmo de burbuja
        for (k = 1; k < n; k++) {
            for (i = 0; i < (n - k); i++) {
                auxbandera = CopyMovie[i].title.charAt(0).localeCompare(CopyMovie[i+1].title.charAt(0));
                if (auxbandera > 0) {
                    aux = CopyMovie[i];
                    CopyMovie[i] = CopyMovie[i+1];
                    CopyMovie[i+1] = aux; 
                }
            }
        }
        this.setState({
            resultsMovies:CopyMovie
        })
     }

     SearchGenre =(event)=>{
        let genero = event.target.value;
        let CopyMovie = this.state.resultsMovies.slice(); 
        let CopyMovieAux = [];
        for (let index = 0; index < CopyMovie.length; index++) {
            if(CopyMovie[index].genres.includes(genero)){
                CopyMovieAux.push(CopyMovie[index]);
            }
        }
        this.setState({
            resultsMovies:CopyMovieAux
        })
     }
     SearchMovie = (event) =>{
        let busqueda = event.target.value;
        let CopyMovieFixed = this.state.resultsMoviesFixed.slice();
        let CopyMovieAux = [];
        let titlemin;
        for (let index = 0; index < CopyMovieFixed.length; index++) {
            titlemin = CopyMovieFixed[index].title.toLowerCase();
            if(titlemin.includes(busqueda.toLowerCase())){
                CopyMovieAux.push(CopyMovieFixed[index]);
            }
        }
        this.setState({
            resultsMovies: CopyMovieAux
        })

     }

    render(){
        let Movies = (
        <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
      );
        if(this.state.resultsRating){
            Movies = (
                <Fragment>
                    {this.state.resultsMovies.map((movie, index) =>{
                        return (
                            <Card 
                            pelicula = {this.state.resultsLinks[index].tmdbId}
                            titulo = {movie.title}
                            rating = {this.state.RatingAverage.Rating[index]}
                            genero = {movie.genres}
                            key = {movie.movieId}
                            />
                         );
                    })}
                </Fragment>
            );
        }
        return(
            <Fragment>
                <Header
                    OrgRating = {this.OrganizaRating}
                    OrgAZ = {this.OrganizaAZ}
                    OrgGenre = {this.SearchGenre}
                    SearchMovie ={this.SearchMovie}
                />
                <main className="MainInfo" role="main">
                    <Home/>
                    <div className="album py-5 bg-dark">
                        <div className="container">
                            <div className="row">
                                {Movies}
                            </div>
                        </div>
                    </div>
                </main>
            </Fragment>
        );
    }
}

export default ReadCsvComponent;