let myLibrary = [];
let booksGrid = document.querySelector(".grid");
let idCounter = 0;

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.id = undefined;

  this.read = false;
  this.liked = false;
}
/////////// Initial ////////////
retrieveStoredLibraryData();

/////////// Add book through form ////////////

let addButton = document.querySelector(".add-book__btn");
addButton.addEventListener("click", () => {
  document.querySelector(".add-book").classList.toggle("visible");
});

let form = document.querySelector("#book-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  submitBook(e);
});

function submitBook(e) {
  let title = document.querySelector("#book-title");
  let titleValue = title.value.trim();
  let author = document.querySelector("#book-author");
  let authorValue = author.value.trim();
  let pages = document.querySelector("#book-pages");
  let pagesValue = pages.value.trim();

  if (titleValue === "" || titleValue === null) titleValue = "Untitled";
  if (authorValue === "" || authorValue === null)
    authorValue = "Unknown author";
  if (pagesValue === "" || pagesValue === null) pagesValue = "Unknown";

  let newBook = new Book(titleValue, authorValue, pagesValue);
  addBookToLibrary(newBook);

  title.value = "";
  author.value = "";
  pages.value = "";
}

function addBookToLibrary(newBook) {
  newBook.id = idCounter++;

  myLibrary.push(newBook);
  localStorage.setItem("library", JSON.stringify(myLibrary));

  render(myLibrary);
}

function render(library) {
  // loops through array
  // renders each book on the page

  booksGrid.innerHTML = "";

  library.forEach((book) => {
    let bookContainer = document.createElement("div");
    bookContainer.classList.add("book");
    bookContainer.setAttribute("data-id", book.id);
    bookContainer.innerHTML = `<img src="img/book.jpeg" class="book__image"></img>
    <div class="book__info">
      <h2 class="book__title">${book.title}</h2>
      <div class="book__author">by ${book.author}</div>
      <div class="book__pages">${book.pages} pages</div>
    </div>
    <div class="book__status">
    <button class="book__status__read"> 
      <svg>
        <use href="./img/icons.svg#icon-checkmark"></use>
      </svg>
    </button>
    <button class="book__status__like">
      <svg>
        <use href="./img/icons.svg#icon-heart"></use>
      </svg>
    </button>
    <button class="book__status__remove">
      <svg>
        <use href="./img/icons.svg#icon-cross"></use>
      </svg>
    </button>
  </div>`;
    booksGrid.appendChild(bookContainer);

    addBookStatusFunctionality(bookContainer);
  });
}

/////////// Book status ////////////
function addBookStatusFunctionality(book) {
  addButtonFunctionality(book, "remove");
  addButtonFunctionality(book, "like");
  addButtonFunctionality(book, "read");
}

function addButtonFunctionality(book, button) {
  switch (button) {
    case "remove": {
      let removeButton = book.querySelector(".book__status__remove");
      removeButton.addEventListener("click", () => {
        removeBook(book);
      });
      break;
    }

    case "like": {
      let likeButton = book.querySelector(".book__status__like");
      likeButton.addEventListener("click", () => {
        likeBook(book);
      });
      break;
    }

    case "read": {
      let readButton = book.querySelector(".book__status__read");
      readButton.addEventListener("click", () => {
        readBook(book);
      });
      break;
    }
  }
}

function removeBook(book) {
  console.log(book.getAttribute("data-id"));

  // Remove book from library array
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].id === parseInt(book.getAttribute("data-id"))) {
      myLibrary.splice(i, 1);
    }
  }

  // Remove book from DOM
  book.remove();
}

function readBook(book) {
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].id === parseInt(book.getAttribute("data-id"))) {
      if (myLibrary[i].read === false) {
        myLibrary[i].read = true;
        book.classList.add("book--read");
      } else {
        myLibrary[i].read = false;
        book.classList.remove("book--read");
      }
    }
  }
}

function likeBook(book) {
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].id === parseInt(book.getAttribute("data-id"))) {
      if (myLibrary[i].liked === false) {
        myLibrary[i].liked = true;
        book.classList.add("book--liked");
      } else {
        myLibrary[i].liked = false;
        book.classList.remove("book--liked");
      }
    }
  }
}

/////////// Stored library data ////////////
function retrieveStoredLibraryData() {
  let storedLibraryData = localStorage.getItem("library");
  if (storedLibraryData) {
    myLibrary = JSON.parse(storedLibraryData);
    render(myLibrary);
  }
}
