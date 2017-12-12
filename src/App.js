import React, { Component } from 'react';
import './App.css';
import SearchView from './views/SearchView'

class App extends Component {
  render() {
    return (
      <div className='app'>
        <SearchView />
      </div>
    );
  }
}

export default App;
