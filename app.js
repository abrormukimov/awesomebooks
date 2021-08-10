function qs(element) {
  return document.querySelector(element);
}

const addButton = qs('.add-btn');
const ul = qs('.ul');

function getFromLocalStorage() {
  let store;
  if (localStorage.getItem('store') === null) {
    store = [];
  } else {
    store = JSON.parse(localStorage.getItem('store'));
  }
  return store;
}

function setToLocalStorage(book) {
  const store = getFromLocalStorage();
  store.push(book);
  localStorage.setItem('store', JSON.stringify(store));
}

function removeBook(title) {
  const store = getFromLocalStorage();
  store.forEach((book, index) => {
    if (book.title === title) {
      store.splice(index, 1);
    }
  });
  localStorage.setItem('store', JSON.stringify(store));
}

function Book(title, author) {
  this.title = title;
  this.author = author;
}

function addBookToLibrary(book) {
  const li = document.createElement('li');
  const titleSpan = document.createElement('span');
  titleSpan.innerHTML = `${book.title} `;
  const authorSpan = document.createElement('span');
  authorSpan.innerHTML = `${book.author} `;
  const removeButton = document.createElement('button');
  const hr = document.createElement('hr');

  titleSpan.classList.add('book-title');
  authorSpan.classList.add('book-author');
  removeButton.classList.add('remove-btn');
  removeButton.innerHTML = 'Remove';

  li.appendChild(titleSpan);
  li.appendChild(authorSpan);
  li.appendChild(removeButton);
  li.appendChild(hr);

  ul.appendChild(li);
}

document.addEventListener('DOMContentLoaded', () => {
  const fromStorage = getFromLocalStorage();
  fromStorage.forEach((book) => {
    addBookToLibrary(book);
  });
});

addButton.addEventListener('click', (e) => {
  e.preventDefault();
  const title = qs('.form-title').value;
  const author = qs('.form-author').value;
  const book = new Book(title, author);
  addBookToLibrary(book);
  setToLocalStorage(book);
});

ul.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-btn')) {
    e.target.parentElement.remove();
    removeBook(e.target.previousElementSibling.previousElementSibling.textContent);
  }
});
