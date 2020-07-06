import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Books extends Component {
  noBooksAvailable() {
    toast.info('Sorry, there are no books available at the moment')
  };

  render() {
    const { 
      list, 
      mainLibrary, 
      onClick, 
      disableBorrow, 
      existsInUserList 
    } = this.props;
    let title = 'Library';
    let buttonText = 'Borrow';
    let buttonId = 'borrow-btn';

    if (!mainLibrary) {
      title = 'User books';
      buttonText = 'Return';
      buttonId = 'return-btn';
    }
    
    return (
      <div>
        <h1>{title}</h1>
        {mainLibrary && !list.length && 
          <ToastContainer
            position='bottom-center'
            type='info'
            autoClose={false}
          >
            {this.noBooksAvailable()}
          </ToastContainer>
        }
        <ul>
          {list.map((book, index) => (
            <li key={index}>
              <p>{book.title}</p>
              <p>{book.author}</p>
              <img src={book.image} alt={book.title} />
                <button 
                  id={buttonId} 
                  onClick={() => onClick(index)} 
                  disabled={mainLibrary && (disableBorrow || existsInUserList(index))}
                >
                  {buttonText}
                </button>
              <p>Number of copies: {book.copies}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Books;