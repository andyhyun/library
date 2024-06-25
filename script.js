"use strict";

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ` +
           `${(this.read) ? "completed": "not read yet"}`;
};

Book.prototype.readString = function() {
    return (this.read) ? "Completed" : "Not Read Yet";
};

function addBookToLibrary(book) {
    const addIndex = myLibrary.length;
    myLibrary.push(book);

    const container = document.getElementById("card-container");

    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.index = `${addIndex}`;

    const cardBookTitle = document.createElement("h3");
    cardBookTitle.classList.add("card-book-title");
    cardBookTitle.textContent = book.title;
    card.appendChild(cardBookTitle);

    const cardBookAuthor = document.createElement("p");
    cardBookAuthor.classList.add("card-book-author");
    cardBookAuthor.textContent = book.author;
    card.appendChild(cardBookAuthor);

    const cardBookPages = document.createElement("p");
    cardBookPages.classList.add("card-book-pages");
    cardBookPages.textContent = `${book.pages} pages`;
    card.appendChild(cardBookPages);

    const cardBookRead = document.createElement("p");
    cardBookRead.classList.add("card-book-read");
    cardBookRead.textContent = book.readString();
    card.appendChild(cardBookRead);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
        myLibrary.splice(addIndex, 1);
        const cards = container.children;
        let walkIndex = 0;
        while(cards.item(walkIndex)) {
            if (walkIndex >= addIndex) {
                cards.item(walkIndex).dataset.index = `${walkIndex - 1}`;
            }
            walkIndex++;
        }
        card.remove();
    });
    card.appendChild(deleteButton);

    const readToggleLabel = document.createElement("label");
    readToggleLabel.classList.add("read-toggle-label");
    const readToggle = document.createElement("input");
    readToggle.type = "checkbox";
    readToggle.checked = book.read;
    readToggleLabel.appendChild(readToggle);
    const readToggleSpan = document.createElement("span");
    readToggleSpan.textContent = "Read";
    readToggleLabel.appendChild(readToggleSpan);
    readToggle.addEventListener("change", () => {
        if (readToggle.checked) {
            book.read = true;
        } else {
            book.read = false;
        }
        cardBookRead.textContent = book.readString();
    });
    card.appendChild(readToggleLabel);

    container.appendChild(card);
}

// TODO: use when loading library from some storage
function resetContainer() {
    const container = document.getElementById("card-container");

    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }

    for (const book of myLibrary) {
        addBookToLibrary(book);
    }
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary(theHobbit);
const latheOfHeaven = new Book("The Lathe of Heaven", "Ursula K. Le Guin", 184, true);
addBookToLibrary(latheOfHeaven);
const placeholderBook = new Book("Placeholder", "Author", 123, true);
addBookToLibrary(placeholderBook);
const placeholderBook2 = new Book("Placeholder", "Author", 123, true);
addBookToLibrary(placeholderBook2);

const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const newBookButton = document.getElementById("new-book-btn");
const cancelButton = document.getElementById("cancel-btn");
const addBookButton = document.getElementById("add-book-btn");

newBookButton.addEventListener("click", () => {
    dialog.showModal()
});

cancelButton.addEventListener("click", () => {
    dialog.close();
});

addBookButton.addEventListener("click", (event) => {
    for (const element of form) {
        if (!element.validity.valid) {
            return;
        }
    }

    event.preventDefault();

    const newBook = new Book(
        form[0].value,
        form[1].value,
        form[2].value,
        form[3].checked,
    );
    addBookToLibrary(newBook);

    form.reset();
    dialog.close();
});

