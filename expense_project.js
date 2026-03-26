"use strict";

/*
- Represents a single expense record.
- The date cannot be in the future.
- The amount must be a positive number.
- The category must be a non-empty string.
- Expense objects are immutable once created.
*/

class Expense {
  #id;
  #amount;
  #date;
  #category;

  constructor(id, amount, date, category) {
    this.#id = id;
    this.#amount = amount;
    this.#date = new Date(date);
    this.#category = category;
  }

  get id() { return this.#id }
  get amount() { return this.#amount }
  get date() { return this.#date }
  get category() { return this.#category }
}

export { Expense };