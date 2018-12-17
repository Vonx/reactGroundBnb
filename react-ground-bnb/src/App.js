import React, { Component } from 'react';
import logo from './logo.svg';
import {Header} from './shared/Header';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Header />
            I am App component
      </div>
    );
  }
}

export default App;
