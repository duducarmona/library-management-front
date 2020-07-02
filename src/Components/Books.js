import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Books extends Component {
  state = {
    books: this.props.list
  }

  noBooksAvailable() {
    toast.info('Sorry, there are no books available at the moment')
  };

  render() {
    const { books } = this.state;

    return (
      <div>
        <ToastContainer
          position='bottom-center'
          type='info'
          autoClose={false}
        >
        </ToastContainer>
        <h1>List of books</h1>
        {!books.length && this.noBooksAvailable()}
        <ul>
          {books.map((book, index) => (
            <li key={index}>
              <p>{book.title}</p>
              <p>{book.author}</p>
              <img src={book.image} alt={book.title} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Books;