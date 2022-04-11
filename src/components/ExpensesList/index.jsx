import React from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";

import "./style.scss";
import trashImage from "../../assets/img/delete_black.svg";
import editImage from "../../assets/img/edit.svg";
import { removeExpense, editExpensesAction } from "../../store/reducer";

class ExpensesList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.deleteExpense = this.deleteExpense.bind(this);
		this.editExpenses = this.editExpenses.bind(this);
	}
	deleteExpense(event) {
		this.props.removeExpense({ id: +event.target.id });
	}
	editExpenses(event) {
		this.props.editExpensesAction({ id: event.target.id });
	}	
	render() {
		const { expensesList } = this.props.budgetList;

		return (
			<ul>
				{expensesList.map((item) => (
					<li key={item?.id}>
						<div className="expensesText">- {item?.text}</div>
						<div className="expensesText">{item?.amountOfMoney}$</div>
						<div>
							<button
								onClick={this.editExpenses}
								className="listButtons editBtn"
							>
								<img src={editImage} alt="" id={item?.id} />
							</button>
							<button
								onClick={this.deleteExpense}
								className=" listButtons trashBtn"
							>
								<img src={trashImage} alt="" id={item?.id} />
							</button>
						</div>
					</li>
				))}
			</ul>
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
			removeExpense,
			editExpensesAction,
		},
		dispatch
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesList);
