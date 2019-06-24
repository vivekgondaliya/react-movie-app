import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import apiKey from '../apiKey';
import { Input, InputAdornment } from '@material-ui/core';



export default class ButtonAppBar extends React.Component {
  state = {
    searchText: ''
  }

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
  render(){
    return (
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
    );
  }
}