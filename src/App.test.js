import React from 'react';
import App from './App';
import { shallow } from 'enzyme';
import Books from './Components/Books';

describe('Checking the list of books', () => {
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

  beforeEach(() => {
    books = shallow(<Books list={fakeBooks} />);
    liArray = books.find('li');
  });

  it('Should render the Books component', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.containsMatchingElement(<Books list={fakeBooks} />)).toEqual(true);
  });

  it('Should render the Title', () => {
    const wrapper = shallow(<Books list={[]} />);

    expect(wrapper.find('h1').text()).toContain('List of books');
  });

  it('There are no books, so the function to display the message is called', () => {
    const noBooksFunc = jest.spyOn(Books.prototype, 'noBooksAvailable');
    const component = shallow((<Books list={[]} />));

    component.update();

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