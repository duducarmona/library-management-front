import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Books from './Components/Books';

class App extends Component {
  render() {
    const list = [
      {
        title: 'In Search of Lost Time',
        author: 'Marcel Proust',
        isbn: '9780142437964',
        image: 'https://images-na.ssl-images-amazon.com/images/I/51Wrlbko5QL._SX332_BO1,204,203,200_.jpg'
      },
      {
        title: 'Ulysses',
        author: 'James Joyce',
        isbn: '9788497930963',
        image: 'https://images-na.ssl-images-amazon.com/images/I/41i+rML5JsL._SX324_BO1,204,203,200_.jpg'
      },
      {
        title: 'Don Quixote',
        author: 'Miguel de Cervantes',
        isbn: '9788424116262',
        image: 'https://images-na.ssl-images-amazon.com/images/I/51nBHIQv6zL._SX332_BO1,204,203,200_.jpg'
      }
    ];

    return (
      <div className="App">
        <Switch>
          <Route exact path='/' >
            <Books list={list} />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
