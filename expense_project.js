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

class ExpenseManager {
  #expenses;
  #nextId;
  #categories;

  static #DEFAULT_CATEGORIES = [
    'food',
    'housing',
    'transportation',
    'entertainment',
    'health',
  ];

  constructor() {
    this.#expenses = [];
    this.#nextId = this.#generateId();
    this.#categories = new Set(ExpenseManager.#DEFAULT_CATEGORIES);
  }

  get expenses() {
    return [...this.#expenses];
  }

  addExpense(expenseData) {
    const category = expenseData.category.trim().toLowerCase();
    if (!this.#categories.has(category)) {
      throw new Error(`Failed to add expense: Unknown category '${category}'`);
    }
    const uniqueId = 1;
    try {
      const expense = new Expense(
        uniqueId,
        expenseData.amount,
        expenseData.date,
        category
      );
      this.#expenses.push(expense);
    } catch (error) {
      throw new Error(`Failed to add expense: ${error.message}`);
    }
  }

  removeExpenseById(id) {
    this.#expenses = this.#expenses.filter(expense => expense.id !== id);
  }

  getCategories() {
    return Array.from(this.#categories);
  }

  addCategory(category) {
    category = category.trim().toLowerCase();
    if (category === '') {
      throw new Error('Failed to add category: Category must be a non-empty string.');
    }

    this.#categories.add(category);
  }

  summarizeExpenses() {
    const total = this._getTotalExpenses();
    const count = this.#expenses.length;
    const average = count ? total / count : 0;
    return { total, count, average };
  }

  filterExpensesByCategory(category) {
    category = category.trim().toLowerCase();
    return this.#expenses.filter(expense => expense.category === category);
  }

  filterExpensesByDateRange(startDate, endDate) {
    return this.#expenses.filter(expense =>
      expense.date >= new Date(startDate) && expense.date <= new Date(endDate)
    );
  }

  #generateId() {
    const id = this.#nextId;
    this.#nextId++;
    return id;
  }

  _getTotalExpenses() {
    return this.#expenses.reduce((sum, exp) => sum + exp.amount, 0);
  }
}

class BudgetExpenseManager extends ExpenseManager {
  #budgetLimit;

  constructor(budgetLimit) {
    if (typeof budgetLimit !== 'number' || budgetLimit <= 0) {
      throw new Error("Budget limit must a positive number.");
    }
    super();

    this.#budgetLimit = budgetLimit;
  }

  addExpense(expenseData) {
    if (expenseData.amount > this.remainingBudget()) {
      throw new Error(`Failed to add expense (Amount: ${expenseData.amount}) Exceeds budget limit of ${this.#budgetLimit})`);
    }

    super.addExpense(expenseData);
  }

  summarizeExpenses() {
    const baseSummary = super.summarizeExpenses();
    const remaining = this.remainingBudget();

    return {
      ...baseSummary,
      budgetLimit: this.#budgetLimit,
      remainingBudget: remaining,
    };
  }

  remainingBudget() {
    return this.#budgetLimit - this._getTotalExpenses();
  }
}

export { Expense, ExpenseManager, BudgetExpenseManager };

