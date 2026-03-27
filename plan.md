
## ExpenseManager
- Manages a collection of Expense objects.
- Supports operations to:
    Add a new expense.
    Remove an expense by id.
    Add a new allowed category.
    Retrieve the current list of allowed categories.
- Instances should start with a default set of allowed categories:
- Food, Housing, Transportation, Entertainment, and Health.
- Enforces that all expenses belong to an allowed category.

    - Summarize expenses (total spent, average amount, and count).
    - Filter expenses by a date range.
    - Filter expenses by category.

## BudgetExpenseManager
- Provides similar behavior to ExpenseManager but includes a budget limit.
- Prevents adding expenses that would cause the total to exceed the budget.
- Provides a way to show how much budget remains.
- Summary also reports how much of the budget has been used.

## General Guidelines:
- Maintain encapsulation. Expose only what’s necessary through public methods.
- Use defensive copies when returning collections or objects to prevent unintended external modifications.
- Write tests to verify that each class and method meets its stated requirements.
