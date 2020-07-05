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
        image: 'https://images-na.ssl-images-amazon.com/images/I/51Wrlbko5QL._SX332_BO1,204,203,200_.jpg',
        copies: 3
      },
      {
        title: 'Ulysses',
        author: 'James Joyce',
        isbn: '9788497930963',
        image: 'https://images-na.ssl-images-amazon.com/images/I/41i+rML5JsL._SX324_BO1,204,203,200_.jpg',
        copies: 1
      },
      {
        title: 'Don Quixote',
        author: 'Miguel de Cervantes',
        isbn: '9788424116262',
        image: 'https://images-na.ssl-images-amazon.com/images/I/51nBHIQv6zL._SX332_BO1,204,203,200_.jpg',
        copies: 2
      },
      {
        title: 'In Search of Lost Time',
        author: 'Marcel Proust',
        isbn: '9780142437964',
        image: 'https://images-na.ssl-images-amazon.com/images/I/51Wrlbko5QL._SX332_BO1,204,203,200_.jpg',
        copies: 3
      }
    ],
    userBooks: [],
    disableBorrow: false
  };

  componentDidMount() {
    this.fixDuplicates();
  };

  borrowBook = (i) => {
    const { library, userBooks } = this.state;
    const newLibrary = [...library];
    const book = newLibrary[i];

    if (book.copies === 1) {
      newLibrary.splice(i, 1);
    }
    else {
      newLibrary[i].copies--;
    }

    const newUserBooks = [...userBooks, book];

    this.setState({
      library: newLibrary,
      userBooks: newUserBooks,
      disableBorrow: newUserBooks.length > 1
    });
  }

  fixDuplicates() {
    const { library } = this.state;
    const newLibrary = [];
    let isbn;
    let isbnArray = [];
    let pos;

    for (let i = 0; i < library.length; i++) {
      isbn = library[i].isbn;
      pos = isbnArray.indexOf(isbn);

      if (pos !== -1) {
        // The ISBN exists so, increment the number of copies.
        newLibrary[pos].copies += library[i].copies;
      }
      else {
        // The ISBN doesn't exist so, add the element to the new array.
        isbnArray.push(isbn);
        newLibrary.push(library[i]);
      }
    }

    this.setState({
      library: newLibrary
    });
  };

  existsInUserList = (index) => {
    const { userBooks, library } = this.state;
    const isbn = library[index].isbn;

    for (let i = 0; i < userBooks.length; i++) {
      if (isbn === userBooks[i].isbn) {
        return true;
      }
    }

    return false;
  }

  render() {
    const { library, userBooks, disableBorrow } = this.state;

    return (
      <div className="App">
        <Switch>
          <Route exact path='/' >
            <div className='wrapper-books'>
              <Books 
                id='main-library' 
                list={library} 
                mainLibrary={true} 
                onClick={this.borrowBook} 
                disableBorrow={disableBorrow}
                existsInUserList={this.existsInUserList} 
              />
              <Books 
                id='user-library' 
                list={userBooks} 
                mainLibrary={false}
                existsInUserList={this.existsInUserList}
              />
            </div>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
