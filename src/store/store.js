import { configureStore } from '@reduxjs/toolkit';
import expensesReducer from './reducer';

export const store = configureStore({
  reducer: {
    budgetList: expensesReducer
  },
  devTools: true
});