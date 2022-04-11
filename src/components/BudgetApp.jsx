import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";

import "./style.scss";
import { ReactComponent as BudgetSvg } from "../assets/img/attach_money.svg";
import { ReactComponent as ExpensesSvg } from "../assets/img/credit_card.svg";
import { ReactComponent as BalanceSvg } from "../assets/img/account_balance_wallet.svg";
import {
	setBudget,
	setExpenses,
	removeExpense,
	confirmEditExpenseAction,
	changeValueBudget,
	changeValueExpenses,
	changeValueExpensesText,
} from "../store/reducer";
import ExpensesList from "./ExpensesList";

class BudgetApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.onChangeValueBudget = this.onChangeValueBudget.bind(this);
		this.onClickBudget = this.onClickBudget.bind(this);
		this.onChangeValueExpenses = this.onChangeValueExpenses.bind(this);
		this.onChangeValueExpensesText = this.onChangeValueExpensesText.bind(this);
		this.onClickExpenses = this.onClickExpenses.bind(this);
		this.deleteExpense = this.deleteExpense.bind(this);
		this.confirmEditingExpenses = this.confirmEditingExpenses.bind(this);
	}
	onChangeValueBudget(event) {
		this.props.changeValueBudget({ value: event.target.value });
	}
	onClickBudget() {
		this.props.setBudget();
	}
	onChangeValueExpenses(event) {
		this.props.changeValueExpenses({ value: event.target.value });
	}
	onChangeValueExpensesText(event) {
		this.props.changeValueExpensesText({ value: event.target.value });
	}
	onClickExpenses() {
		this.props.setExpenses();
	}
	deleteExpense(event) {
		this.props.removeExpense({ id: +event.target.id });
	}
	confirmEditingExpenses() {
		this.props.confirmEditExpenseAction({
			id: this.state.editingItemId,
			textInInputExpenses: this.state.textInInputExpenses,
		});
	}

	render() {
		const {
			valueBudget,
			valueExpenses,
			valueExpensesText,
			isEditing,
			budget,
			balance,
			expenses,
		} = this.props.budgetList;

		return (
			<div className="contetnt">
				<div>
					<div className="wpapper wpapper_green">
						<div>Please enter your budget</div>
						<input
							type="number"
							onChange={this.onChangeValueBudget}
							value={valueBudget}
						/>
						<button
							className="confirmButton_green"
							onClick={this.onClickBudget}
							disabled={!valueBudget.length ? true : false}
						>
							Calculate
						</button>
					</div>
					<div className="wpapper wpapper_red">
						<div>Please enter your expense</div>
						<input
							type="text"
							onChange={this.onChangeValueExpensesText}
							value={valueExpensesText}
						/>
						<div>Please enter expense amount</div>
						<input
							disabled={isEditing}
							type="number"
							value={valueExpenses}
							onChange={this.onChangeValueExpenses}
						/>
						{isEditing ? (
							<button
								className="confirmButton_red"
								onClick={this.confirmEditingExpenses}
							>
								Edit expenses
							</button>
						) : (
							<button
								className="confirmButton_red"
								onClick={this.onClickExpenses}
								disabled={!valueExpenses.length ? true : false}
							>
								Add expenses
							</button>
						)}
					</div>
				</div>
				<div className="icons-wrapper">
					<div className="icons">
						<div className="icon">
							<div className="title">- Budget -</div>
							<BudgetSvg />
							<div className="title">{budget}$</div>
						</div>
						<div className="icon">
							<div className="title">- Expenses -</div>
							<ExpensesSvg />
							<div className="title">{expenses}$</div>
						</div>
						<div className="icon">
							<div className="title">- Balance -</div>
							<BalanceSvg />
							<div className="title">{balance}$</div>
						</div>
					</div>
					<div className="expensesList">
						<div className="title">- Expenses List -</div>
						<ExpensesList />
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		budgetList: state.budgetList,
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{
			setBudget,
			setExpenses,
			removeExpense,
			confirmEditExpenseAction,
			changeValueBudget,
			changeValueExpenses,
			changeValueExpensesText,
		},
		dispatch
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(BudgetApp);
