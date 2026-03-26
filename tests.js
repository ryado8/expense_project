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

try {
  console.log('- Has an id, amount, date, and category.');
  const expense = new Expense(1, 100, '2025-11-06', 'food');
  assert(expense.id === 1);
  assert(expense.amount === 100);
  assert(expense.date.getTime() === new Date('2025-11-06').getTime(), 'date should be 2025-11-06');
  assert(expense.category === 'food');
  pass('has an id, amount, date, and category');
} catch (error) { fail(error.message) }