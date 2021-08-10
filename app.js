function qs(element) {
  return document.querySelector(element);
}

const addButton = qs('.add-btn');
const ul = qs('.ul');

function getFromLocalStorage() {
  let locallocalstore;
  if (localStorage.getItem('localstore') === null) {
    localstore = [];
  } else {
    localstore = JSON.parse(localStorage.getItem('localstore'));
  }
  return localstore;
}

function setToLocalStorage(book) {
  const localstore = getFromLocalStorage();
  localstore.push(book);
  localStorage.setItem('localstore', JSON.stringify(localstore));
}

function removeBook(title1) {
  let localstore = getFromLocalStorage();
  for (let i = 0; i < localstore.length; i++) {
    if (localstore[i].title == title1) {
      localstore.splice(i, 1);
    }
  }
  localStorage.setItem('localstore', JSON.stringify(localstore));
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
