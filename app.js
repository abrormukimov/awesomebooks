const bookTitle = qs('book-title');
const bookAuthor = qs('book-author');
const removeButton = qs('remove-btn');
const form = qs('form');
const formTitle = qs('form-title');
const formAuthor = qs('form-author');
const addButton = qs('add-btn');

let library = [];

function Book(title, author) {
  this.title = title;
  this.author = author;
}

addButton.addEventListener('submit', addBookToLibrary);









function addBookToLibrary() {
  const title = formTitle.value;
  const author = formAuthor.value;
  const book = new Book(title, author);
  library.push(book);
}

function qs(element) {
  return document.querySelector(element);
}