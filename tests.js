import { Expense, ExpenseManager } from './expense_project.js';

function pass(msg) {
  console.log('\x1b[32m  PASS:\x1b[0m ' + msg);
}

function fail(msg) {
  console.log('\x1b[31m  FAIL:\x1b[0m ' + msg);
}

function assert(condition, msg) {
  if (!condition) throw new Error(msg);
}

console.log('\n===PART 1: EXPENSE ===\n');

// - Has an id, amount, date, and category.
try {
  console.log('- Has an id, amount, date, and category.');
  const expense = new Expense(1, 100, '2025-11-06', 'food');
  assert(expense.id === 1);
  assert(expense.amount === 100);
  assert(expense.date.getTime() === new Date('2025-11-06').getTime(), 'date should be 2025-11-06');
  assert(expense.category === 'food');
  pass('has an id, amount, date, and category');
} catch (error) { fail(error.message) }

// - The date cannot be in the future.
try {
  console.log("- The date cannot be in the future.");
  // eslint-disable-next-line no-unused-vars
  const expense = new Expense(1, 100, '2030-11-06', 'food');
  fail('should throw error for date in the future');
} catch (_) {
  pass('dates cannot be in the future');
}

// - The amount must be a positive number.
try {
  console.log("- The amount must be a positive number.");
  // eslint-disable-next-line no-unused-vars
  const expense = new Expense(1, 0, '2025-11-06', 'food');
  fail('should throw error for non-positive amount');
} catch (_) {
  pass('amounts must be positive');
}

// - The category must be a non-empty string.
try {
  console.log("- The category must be a non-empty string.");
  // eslint-disable-next-line no-unused-vars
  const expense = new Expense(1, 100, '2025-11-06', '');
  fail('should throw error for empty category string');
} catch (_) {
  pass('category must be non-empty');
}

// - Expense objects are immutable once created. (cannot edit properties)
try {
  console.log("- Expense objects are immutable once created. (cannot edit properties)");
  const expense = new Expense(1, 110, '2025-11-06', 'food');
  expense.id = 42;
  fail('should throw error when trying to update a property');
} catch (_) {
  pass('cannot change properties once expense has been created');
}

// - Expense objects are immutable once created. (cannot add new properties)
try {
  console.log("- Expense objects are immutable once created. (cannot add new properties)");
  const expense = new Expense(1, 110, '2025-11-06', 'food');
  expense.newProperty = 42;
  fail('should throw error when trying to add a new property');
} catch (_) {
  pass('cannot add properties once expense has been created');
}

console.log('\n=== PART 2: EXPENSE MANAGER (BASIC) ===\n');

// - Manages a collection of Expense objects.
try {
  console.log('- Manages a collection of Expense objects.');
  const manager = new ExpenseManager();
  assert(manager.expenses.length === 0, 'expenses shoud be empty');
  manager.addExpense({ amount: 100, date: '2025-11-06', category: 'food' });
  assert(manager.expenses.length === 1, 'expenses should have length of 1');
  pass('maintains a list of Expense objects');
} catch (error) { fail(error.message) }

// - Add a new expense.
try {
  console.log('- Add a new expense.');
  const manager = new ExpenseManager();
  manager.addExpense({ amount: 100, date: '2025-11-06', category: 'food' });
  assert(manager.expenses[0].amount === 100, 'amount should be 100');
  assert(manager.expenses[0].date.getTime() === new Date('2025-11-06').getTime(), 'date should be 2025-11-06');
  assert(manager.expenses[0].category === 'food', 'category should be food');
  pass('adds a new expense');
} catch (error) { fail(error.message) }

// - Remove an expense by id.
try {
  console.log('- Remove an expense by id.');
  const manager = new ExpenseManager();
  manager.addExpense({ amount: 100, date: '2025-11-06', category: 'food' });
  assert(manager.expenses.length === 1, 'expenses should have length of 1');
  manager.removeExpenseById(1);
  assert(manager.expenses.length === 0, 'expenses shoud be empty');
  pass('removes an expense by id');
} catch (error) { fail(error.message) }

// - Retrieve the current list of allowed categories.
try {
  console.log('- Retrieve the current list of allowed categories.');
  const manager = new ExpenseManager();
  const initialCategories = manager.getCategories();
  assert(initialCategories.length === 5);
  assert(initialCategories.includes('food'), 'food should be in categories');
  assert(initialCategories.includes('housing'), 'housing should be in categories');
  assert(initialCategories.includes('transportation'), 'transportation should be in categories');
  assert(initialCategories.includes('entertainment'), 'entertainment should be in categories');
  assert(initialCategories.includes('health'), 'health should be in categories');
  pass('Initial categories are food, housing, transportation, entertainment, and health');
} catch (error) { fail(error.message) }

// - Allows known categories
try {
  console.log('- Allows known categories.');
  const manager = new ExpenseManager();
  manager.addExpense({ amount: 100, date: '2025-11-06', category: 'food' });
  assert(manager.expenses.length === 1, 'expenses should have length of 1');
  pass('Allows known categories');
} catch (error) { fail(error.message) }

// - Disallows unknown categories
try {
  console.log("- Disallows unknown categories.");
  const manager = new ExpenseManager();
  manager.addExpense({ amount: 100, date: '2025-11-06', category: 'test' });
  fail('should throw error when trying to add expense with an unknown category');
} catch (_) {
  pass('cannot add expenses with an unknown category');
}

// - Add a new allowed category.
try {
  console.log('- Allows known categories.');
  const manager = new ExpenseManager();
  manager.addCategory('eating out');
  manager.addExpense({ amount: 100, date: '2025-11-06', category: 'eating out' });
  pass("Allows adding new categories");
} catch (error) { fail(error.message) }