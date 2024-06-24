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

function addBookToLibrary(book) {
    myLibrary.push(book);

    const container = document.getElementById("cardContainer");

    const card = document.createElement("div");
    card.classList.add("card");
    const addIndex = myLibrary.length - 1;
    card.dataset.index = `${addIndex}`;
    const cardDescription = document.createElement("div");
    cardDescription.classList.add("description");
    cardDescription.textContent = book.info();
    card.appendChild(cardDescription);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "delete";
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
    const readToggle = document.createElement("input");
    readToggle.type = "checkbox";
    readToggle.checked = book.read;
    readToggleLabel.appendChild(readToggle);
    const readToggleSpan = document.createElement("span");
    readToggleSpan.textContent = "read";
    readToggleLabel.appendChild(readToggleSpan);
    readToggle.addEventListener("change", () => {
        if (readToggle.checked) {
            book.read = true;
        } else {
            book.read = false;
        }
        cardDescription.textContent = book.info();
    });
    card.appendChild(readToggleLabel);

    container.appendChild(card);
}

// TODO: use when loading library from some storage
function resetContainer() {
    const container = document.getElementById("cardContainer");

    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }

    for (const book of myLibrary) {
        addBookToLibrary(book);
    }
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary(theHobbit);
const ph = new Book("ph", "ph", 123, true);
addBookToLibrary(ph);
const ph2 = new Book("ph2", "ph2", 123, false);
addBookToLibrary(ph2);
const ph3 = new Book("ph3", "ph3", 123, false);
addBookToLibrary(ph3);
const ph4 = new Book("ph4", "ph4", 123, true);
addBookToLibrary(ph4);
const ph5 = new Book("ph5", "ph5", 123, true);
addBookToLibrary(ph5);

const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const newBookButton = document.getElementById("newBookBtn");
const cancelButton = document.getElementById("cancelBtn");
const addBookButton = document.getElementById("addBookBtn");

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

