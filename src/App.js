import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store from './redux/store';
import './App.css';
import SearchView from './views/SearchView'

class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <div className='app'>
          <SearchView />
        </div>
      </Provider>
    );
  }
}

export default App;
