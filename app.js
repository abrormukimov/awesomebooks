function qs(element) {
  return document.querySelector(element);
}

const addButton = qs('.add-btn');
const ul = qs('.ul');

const library = [];

function Book(title, author) {
  this.title = title;
  this.author = author;
}

function addBookToLibrary(e) {
  e.preventDefault();
  const title = qs('.form-title').value;
  const author = qs('.form-author').value;
  const book = new Book(title, author);

  library.push(book);

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

addButton.addEventListener('click', addBookToLibrary);

ul.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-btn')) {
    e.target.parentElement.remove();
    removeBookFromLibrary((e.target.previousElementSibling.previousElementSibling.textContent));
  }
});
