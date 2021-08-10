function qs(element) {
  return document.querySelector(element);
}

const addButton = qs('.add-btn');
const ul = qs('.ul');

const library = [];

//retreivefromlocalstorate
function getFromLocalStorage() {
  let store;
  if (localStorage.getItem('store') === null) {
    store = [];
  } else {
    store = JSON.parse(localStorage.getItem('store'));
  }
  return store;
}

//addToLocalStorage
function setToLocalStorage(book) {
  const store = getFromLocalStorage();
  store.push(book);
  localStorage.setItem('store', JSON.stringify(store));
}

//removeFromLocalstorage




function Book(title, author) {
  this.title = title;
  this.author = author;
}

function addBookToLibrary(book) {
 
  const title = qs('.form-title').value;
  const author = qs('.form-author').value;
  book = new Book(title, author);

  setToLocalStorage(book)

  const li = document.createElement('li');
  const titleSpan = document.createElement('span');
  titleSpan.innerHTML = `${title} `;
  const authorSpan = document.createElement('span');
  authorSpan.innerHTML = `${author} `;
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

function removeBookFromLibrary(title) {
  library.forEach((book, index) => {
    if (book.title === title) {
      library.splice(index, 1);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
 const fromStorage = getFromLocalStorage();
 fromStorage.forEach(book => {
  addBookToLibrary(book)
 })
});
addButton.addEventListener('click', (e) => {
  e.preventDefault();
  addBookToLibrary(book)
});


ul.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-btn')) {
    e.target.parentElement.remove();
    removeBookFromLibrary((e.target.previousElementSibling.previousElementSibling.textContent));
  }
});
