import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import logo from './logo.svg';
import {Header} from './shared/Header';
import { RentalList } from './components/rental/RentalList';
import './App.css';
import {RentalDetail} from "./components/rental/RentalDetail";

class App extends Component {
  render() {
    return (
        <BrowserRouter>
      <div className="App">
          <Header />
          <div className='container'>
              <Route exact path="/" component={RentalList}/>
              <Route exact path="/test" component={RentalDetail}/>

          </div>
      </div>
        </BrowserRouter>
    );
  }
}

export default App;
