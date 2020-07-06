import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Books.css';

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
    let classNameImg = 'main-img';
    let classNameLi = 'main-li';
    let classNameTitle = 'main-title';
    let classNameAuthor = 'main-author';
    let classNameCopies = 'main-copies';
    let classNameButton = 'main-button';
    let classNameLibrary = 'main-library';

    if (!mainLibrary) {
      title = 'User books';
      buttonText = 'Return';
      buttonId = 'return-btn';
      classNameImg = 'user-img';
      classNameLi = 'user-li';
      classNameTitle = 'user-title';
      classNameAuthor = 'user-author';
      classNameCopies = 'user-copies';
      classNameButton = 'user-button';
      classNameLibrary = 'user-library';
    }
    
    return (
      <div className={classNameLibrary}>
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
            <li className={classNameLi} key={index}>
              <div className='wrapper-title-author'>
                <p className={classNameTitle}>{book.title}</p>
                <p className={classNameAuthor}>{book.author}</p>
              </div>
              <img className={classNameImg} src={book.image} alt={book.title} />
              <p className={classNameCopies}>Number of copies: {book.copies}</p>
              <button 
                id={buttonId}
                className={classNameButton}
                onClick={() => onClick(index)} 
                disabled={mainLibrary && (disableBorrow || existsInUserList(index))}
              >
                {buttonText}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Books;