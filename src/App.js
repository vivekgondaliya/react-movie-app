import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Input, InputAdornment } from '@material-ui/core';

import './App.css';
import apiKey from './apiKey';

import MovieCard from './components/MovieCard';
//import AppBar from './components/AppBar';
import MovieDialog from './components/MovieDialog';

const originalMovies = [
  {id:1, title: 'Psych'},
  {id:2, title: 'Community'}
];

class App extends Component {
  state = {
    movies:[],
    selectedMovie: null,
    searchText: ''
  };

  searchTextChanged = e => {
    this.setState({searchText: e.target.value});
  }
  search = async e => {
    e.preventDefault();
    const {searchText} = this.state;
    const response = await fetch('https://api.themoviedb.org/3/search/movie?api_key='+apiKey+'&query='+this.state.searchText);
    const json = await response.json();
    this.setState({movies: json.results});
  }

  selectMovie = movie => this.setState({selectedMovie: movie});
  clearMovie = () => this.setState({selectedMovie: null});

  async componentDidMount(){
    //this.setState({movies: originalMovies});
    const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key='+apiKey);
    const json = await response.json();
    this.setState({movies: json.results});
  }

  render(){
    const {movies, selectedMovie} = this.state;

    return (
      <div>
        <div>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">
              Top Movies
            </Typography>
            {/* <Button color="inherit">Login</Button> */}
            <form onSubmit={this.search}>
              <Input
                type="search"
                value={this.state.searchText}
                onChange={this.searchTextChanged}  
                startAdornment={
                  <InputAdornment>
                    <span role="img" aria-label="Search"></span>
                  </InputAdornment>
                }
              ></Input>
            </form>
          </Toolbar>
        </AppBar>
      </div>
        <div className="App">
          {
            movies.map(movie => <MovieCard key={movie.id} movie={movie} selectMovie={this.selectMovie}/>)
          }
        </div>
        <MovieDialog movie={selectedMovie} handleClose={this.clearMovie}/>
      </div>
    );
  }
}

export default App;
