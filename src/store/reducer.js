import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  moneyInInputBudget: 0,
  moneyInInputExpenses: 0,
  textInInputExpenses: "",
  valueBudget: "",
  valueExpenses: "",
  valueExpensesText: "",
  isEditing: false,
  editingItemId: 0,
  budget: 0,
  balance: 0,
  expenses: 0,
  expensesList: [],
}


const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    changeValueBudget: (state, action) => {
      state.moneyInInputBudget = +action.payload.value;
      state.valueBudget = action.payload.value;
    },
    setBudget: (state) => {
      state.budget = state.budget + state.moneyInInputBudget;
      state.balance = state.balance + state.moneyInInputBudget
      state.valueBudget = '';
    },
    changeValueExpensesText: (state, action) => {
      state.textInInputExpenses = action.payload.value;
      state.valueExpensesText = action.payload.value;
    },
    changeValueExpenses: (state, action) => {
      state.moneyInInputExpenses = +action.payload.value;
      state.valueExpenses = action.payload.value;
    },
    setExpenses: (state, action) => {
      state.expenses = state.expenses + state.moneyInInputExpenses;
      state.balance = state.balance - state.moneyInInputExpenses;
      state.expensesList.push({
        text: state.textInInputExpenses.length
          ? state.textInInputExpenses
          : "Some expenses",
        amountOfMoney: state.moneyInInputExpenses,
        id: Date.now(),
      })
      state.valueExpenses = "";
      state.valueExpensesText = "";
      state.textInInputExpenses = "";
    },
    removeExpense: (state, action) => {
      const deleteItem = state.expensesList.find(
        (item) => item.id === action.payload.id
      );
      state.expenses = state.expenses - deleteItem?.amountOfMoney;
      state.balance = state.balance + deleteItem?.amountOfMoney;
      state.expensesList = state.expensesList.filter((item) => {
        return item.id !== action.payload.id;
      })
    },
    editExpensesAction: (state, action) => {
      const editItem = state.expensesList.find((item) => item.id === +action.payload.id);
      state.valueExpensesText = editItem?.text;
      state.valueExpenses = editItem?.amountOfMoney;
      state.isEditing = true;
      state.editingItemId = +action.payload.id;
    },
    confirmEditExpenseAction: (state, action) => {
      state.expensesList = state.expensesList.map((item) =>
        state.editingItemId === item.id
          ? {
            id: item.id,
            text: state.textInInputExpenses,
            amountOfMoney: item.amountOfMoney,
          }
          : item
      )
      state.valueExpenses = '';
      state.valueExpensesText = '';
      state.moneyInInputExpenses = 0;
      state.isEditing = false;
      state.editingItemId = 0;
    },
  }
})

export const { setBudget, setExpenses, removeExpense, confirmEditExpenseAction, changeValueBudget, changeValueExpenses, changeValueExpensesText, editExpensesAction } = expensesSlice.actions;

export default expensesSlice.reducer;

