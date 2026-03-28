## BudgetExpenseManager
- Provides similar behavior to ExpenseManager but includes a budget limit.
- Prevents adding expenses that would cause the total to exceed the budget.
- Provides a way to show how much budget remains.
- Summary also reports how much of the budget has been used.

## General Guidelines:
- Maintain encapsulation. Expose only what’s necessary through public methods.
- Use defensive copies when returning collections or objects to prevent unintended external modifications.
- Write tests to verify that each class and method meets its stated requirements.
