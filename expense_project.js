"use strict";


class Expense {
  #id;
  #amount;
  #date;
  #category;

  constructor(id, amount, date, category) {
    if (amount <= 0) {
      throw new Error("Amount must be a positive number.");
    }

    const parsedDate = new Date(date);
    if (parsedDate > new Date()) {
      throw new Error("Date cannot be in the future.");
    }

    const trimmedCategory = category.trim();
    if (trimmedCategory === '') {
      throw new Error("Category must be non-empty string.");
    }

    this.#id = id;
    this.#amount = amount;
    this.#date = parsedDate;
    this.#category = trimmedCategory;
    Object.freeze(this);
  }

  get id() { return this.#id }
  get amount() { return this.#amount }
  get date() { return new Date(this.#date) }
  get category() { return this.#category }
}

export { Expense };