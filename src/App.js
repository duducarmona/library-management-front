import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Books from './Components/Books';

class App extends Component {
  state = {
    library: [
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
    ],
    userBooks: [],
    disableBorrow: false
  };

  borrowBook = (i) => {
    const { library, userBooks } = this.state;
    const newLibrary = [...library];
    const elementToPass = newLibrary.splice(i, 1);
    const newUserBooks = [...userBooks, elementToPass[0]];

    this.setState({
      library: newLibrary,
      userBooks: newUserBooks,
      disableBorrow: newUserBooks.length > 1
    });
  }

  render() {
    const { library, userBooks, disableBorrow } = this.state;

    return (
      <div className="App">
        <Switch>
          <Route exact path='/' >
            <div className='wrapper-books'>
              <Books id='main-library' list={library} mainLibrary={true} onClick={this.borrowBook} disableBorrow={disableBorrow} />
              <Books id='user-library' list={userBooks} mainLibrary={false} />
            </div>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
