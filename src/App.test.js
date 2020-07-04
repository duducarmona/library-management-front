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

let books;
let liArray;
let app;
let library;
let userBooks;
let borrowBook;
let appMount;

beforeEach(() => {
  books = shallow(<Books list={fakeBooks} />);
  liArray = books.find('li');
  app = shallow(<App />);
  borrowBook = jest.fn();
  library = shallow(<Books list={fakeBooks} mainLibrary={true} onClickk={borrowBook} />);
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
  
      expect(pArray.length).toEqual(2);
      expect(imgArray.length).toEqual(1);
      expect(pArray.first().text()).toEqual(fakeBooks[index].title);
      expect(pArray.last().text()).toEqual(fakeBooks[index].author);
      expect(imgArray.getElement().props.src).toEqual(fakeBooks[index].image);
    });
  });
});

describe('User can borrow books from the library', () => {
  it('Each book should have a Borrow button', () => {
    liArray.forEach(li => {
      const buttonArray = li.find('button');

      expect(buttonArray.length).toEqual(1);
      expect(buttonArray.text()).toEqual('Borrow');
    });
  });

  it('When the user clicks on Borrow button the user pass to User books list', () => {
    appMount.find('#borrow-btn').first().simulate('click');

    expect(appMount.find('#user-library').find('li').length).toEqual(1);
  });

  it('If the User has 2 books in his library, the Borrow buttons will be disabled', () => {
    appMount.find('#borrow-btn').first().simulate('click');
    appMount.find('#borrow-btn').first().simulate('click');

    expect(appMount.find('#borrow-btn').first().getElement().props.disabled).toBeTruthy();
  });
});