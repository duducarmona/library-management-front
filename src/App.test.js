import React from 'react';
import App from './App';
import { shallow, mount } from 'enzyme';
import Books from './Components/Books';
import { BrowserRouter } from 'react-router-dom';

const fakeBooks = [
  {
    title: 'In Search of Lost Time',
    author: 'Marcel Proust',
    isbn: '9780142437964',
    image: 'https://images-na.ssl-images-amazon.com/images/I/51Wrlbko5QL._SX332_BO1,204,203,200_.jpg',
    copies: 1
  },
  {
    title: 'Ulysses',
    author: 'James Joyce',
    isbn: '9788497930963',
    image: 'https://images-na.ssl-images-amazon.com/images/I/41i+rML5JsL._SX324_BO1,204,203,200_.jpg',
    copies: 2
  },
  {
    title: 'Don Quixote',
    author: 'Miguel de Cervantes',
    isbn: '9788424116262',
    image: 'https://images-na.ssl-images-amazon.com/images/I/51nBHIQv6zL._SX332_BO1,204,203,200_.jpg',
    copies: 3
  }
];

const booksWithDups = [
  {
    title: 'In Search of Lost Time',
    author: 'Marcel Proust',
    isbn: '9780142437964',
    image: 'https://images-na.ssl-images-amazon.com/images/I/51Wrlbko5QL._SX332_BO1,204,203,200_.jpg',
    copies: 1
  },
  {
    title: 'Ulysses',
    author: 'James Joyce',
    isbn: '9788497930963',
    image: 'https://images-na.ssl-images-amazon.com/images/I/41i+rML5JsL._SX324_BO1,204,203,200_.jpg',
    copies: 2
  },
  {
    title: 'Don Quixote',
    author: 'Miguel de Cervantes',
    isbn: '9788424116262',
    image: 'https://images-na.ssl-images-amazon.com/images/I/51nBHIQv6zL._SX332_BO1,204,203,200_.jpg',
    copies: 3
  },
  {
    title: 'In Search of Lost Time',
    author: 'Marcel Proust',
    isbn: '9780142437964',
    image: 'https://images-na.ssl-images-amazon.com/images/I/51Wrlbko5QL._SX332_BO1,204,203,200_.jpg',
    copies: 4
  }
];

let books;
let liArray;
let app;
let library;
let userBooks;
let borrowBook;
let appMount;
let existsInUserList;

beforeEach(() => {
  borrowBook = jest.fn();
  existsInUserList = jest.fn();
  books = shallow(<Books list={fakeBooks} existsInUserList={existsInUserList} />);
  liArray = books.find('li');
  app = shallow(<App />);
  library = shallow(
    <Books 
      list={fakeBooks} 
      mainLibrary={true} 
      onClick={borrowBook}
      existsInUserList={existsInUserList}
    />
  );
  userBooks = shallow(<Books list={[]} mainLibrary={false} />);
  appMount = mount(
    <BrowserRouter>
      <App />
    </BrowserRouter>); 
});

describe('Checking the list of books', () => {
  it('Class of rendered lists', () => {
    expect(app.find('.wrapper-books').length).toEqual(1);
  });

  it('Should render two list of Books (the main one and the user one)', () => {
    expect(app.find('Books').exists()).toBeTruthy();
    expect(app.find('Books').length).toEqual(2);
  });

  it('Should render the Title of the Library', () => {
    expect(library.find('h1').text()).toContain('Library');
  });

  it('Should render the Title of the User books', () => {
    expect(userBooks.find('h1').text()).toContain('User books');
  });

  it('There are no books, so the function to display the message is called', () => {
    const noBooksFunc = jest.spyOn(Books.prototype, 'noBooksAvailable');
    const emptyBooks = shallow((<Books list={[]} mainLibrary={true} />));

    emptyBooks.update();

    expect(noBooksFunc).toHaveBeenCalled();
  });

  it('There are books, show them in a list', () => {
    expect(books.find('ul').length).toEqual(1);
  });

  it('Each book should be wrapped in a li', () => {
    expect(liArray.length).toEqual(fakeBooks.length);
  });
  
  it('Each book should have a title, an author and an image and the data has to be correct', () => {
    liArray.forEach((li, index) => {
      const pArray = li.find('p');
      const imgArray = li.find('img');

      expect(pArray.length).toEqual(3);
      expect(imgArray.length).toEqual(1);
      expect(pArray.first().text()).toEqual(fakeBooks[index].title);
      expect(pArray.at(1).text()).toEqual(fakeBooks[index].author);
      expect(pArray.last().text()).toEqual(`Number of copies: ${fakeBooks[index].copies}`);
      expect(imgArray.getElement().props.src).toEqual(fakeBooks[index].image);
    });
  });
});

describe('User can borrow books from the library', () => {
  it('Each book should have a Borrow button', () => {
    const mainLibrary = appMount.find('#main-library').find('li');
    
    mainLibrary.forEach(book => {
      const buttonArray = book.find('button');

      expect(buttonArray.length).toEqual(1);
      expect(buttonArray.text()).toEqual('Borrow');
    });
  });

  it('When the user clicks on Borrow button the book pass to User books list', () => {
    appMount.find('#borrow-btn').first().simulate('click');

    expect(appMount.find('#user-library').find('li').length).toEqual(1);
  });

  it('If the User has 2 books in his library, the Borrow buttons will be disabled', () => {
    appMount.find('#borrow-btn').first().simulate('click');
    appMount.find('#borrow-btn').first().simulate('click');

    expect(appMount.find('#borrow-btn').first().getElement().props.disabled).toBeTruthy();
  });
});

describe('User can borrow a copy of a book from the library', () => {
  it('The function to fix the duplicates is called', () => {
    const fixDuplicates = jest.spyOn(App.prototype, 'fixDuplicates');
    const appDup = shallow(<App />);

    appDup.update();

    expect(fixDuplicates).toHaveBeenCalled();
  });

  it('The function to fix the duplicates delete the duplicates in the main library but keep the number of copies correctly', () => {
    const appDup = mount(
      <BrowserRouter>
        <App>
          <Books list={booksWithDups} mainLibrary={true} onClick={borrowBook} />
        </App>
      </BrowserRouter>
    );

    const list = appDup.find('#main-library').first().getElement().props.list;

    function hasDuplicates(books) {
      let isbn;
      let isbnArray = [];

      for (let i = 0; i < books.length; i++) {
        isbn = books[i].isbn;

        if (isbnArray.indexOf(isbn) !== -1) {
          return true;
        }

        isbnArray.push(isbn);
      }

      return false;
    }

    expect(hasDuplicates(list)).toBeFalsy();
  });

  it('If there are more than one copy, one book is added to the user list and the number of copies is decremented in the main list', () => {
    const booksBeforeBorrowInMainLibrary = appMount.find('#main-library').find('li');
    const numberOfBooksBeforeBorrowInMainLibrary = booksBeforeBorrowInMainLibrary.length;
    let copiesBeforeBorrowOfBookToBorrow = booksBeforeBorrowInMainLibrary.first().find('p').last().text();

    copiesBeforeBorrowOfBookToBorrow = copiesBeforeBorrowOfBookToBorrow.split(' ').pop();

    // Click on Borrow
    appMount.find('#borrow-btn').first().simulate('click');

    const booksAfterBorrowInMainLibrary = appMount.find('#main-library').find('li');
    const numberOfBooksAfterBorrowInMainLibrary = booksAfterBorrowInMainLibrary.length;
    let copiesAfterBorrowOfBookToBorrow = booksAfterBorrowInMainLibrary.first().find('p').last().text();

    copiesAfterBorrowOfBookToBorrow = copiesAfterBorrowOfBookToBorrow.split(' ').pop();

    // The number of books is the same before and after borrow the book in the main library.
    expect(numberOfBooksBeforeBorrowInMainLibrary).toEqual(numberOfBooksAfterBorrowInMainLibrary);
    // The number of copies has been decreased by 1 in the book borrowed in the main library.
    expect(`${copiesBeforeBorrowOfBookToBorrow - 1}`).toEqual(copiesAfterBorrowOfBookToBorrow);
  });

  it('If there are only one copy, the book is added to the user list and is deleted from the main list', () => {
    const booksBeforeBorrowInMainLibrary = appMount.find('#main-library').find('li');

    // Click on Borrow on a book with just one copy.
    appMount.find('#borrow-btn').at(1).simulate('click');

    const booksAfterBorrowInMainLibrary = appMount.find('#main-library').find('li');

    // The book has been deleted from the main library list because there was only one copy.
    expect(booksBeforeBorrowInMainLibrary.length - 1).toEqual(booksAfterBorrowInMainLibrary.length);
  });

  it('If the book already exists in the user list, the Borrow button is disabled in the main list', () => {
    expect(appMount.find('#borrow-btn').first().getElement().props.disabled).toBeFalsy();

    appMount.find('#borrow-btn').first().simulate('click');

    expect(appMount.find('#borrow-btn').first().getElement().props.disabled).toBeTruthy();
  });
});

describe('User can return books to the library', () => {
  it('Each book in the user list should have a Return button', () => {
    const borrowBtn = appMount.find('#borrow-btn').first();

    borrowBtn.simulate('click');
    borrowBtn.simulate('click');

    const userBooks = appMount.find('#user-library').find('li');
    
    userBooks.forEach(book => {
      const buttonArray = book.find('button');

      expect(buttonArray.length).toEqual(1);
      expect(buttonArray.text()).toEqual('Return');
    });
  });

  it('When the user clicks on Return button the book pass to Main library list', () => {
    appMount.find('#borrow-btn').first().simulate('click');

    const numberOfBooksInUserBeforeReturn = appMount.find('#user-library').find('li').length;

    appMount.find('#return-btn').first().simulate('click');

    const numberOfBooksInUserAfterReturn = appMount.find('#user-library').find('li').length;

    expect(numberOfBooksInUserBeforeReturn - 1).toEqual(numberOfBooksInUserAfterReturn);
  });

  it('If the user has 2 books and one is returned, the Borrow buttons get enabled again', () => {

  });
});