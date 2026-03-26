import { Expense } from './expense_project.js';

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