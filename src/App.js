import _ from "lodash";
import React from 'react';
import Databases from './Database/Databases';
import AddTransactionForm from './Components/AddTransactionForm/AddTransactionForm';
import Navbar from './Components/Navbar/Navbar';
import Period from './Components/Period/Period';
import PeriodFooter from './Components/PeriodFooter/PeriodFooter';
import PeriodSvc from "./Services/PeriodSvc";
import TransactionSvc from "./Services/TransactionSvc";
import WeekHeader from './Components/WeekHeader/WeekHeader';
import WeekFooter from './Components/WeekFooter/WeekFooter';
import './App.css';

const emptyTransaction = {
  description: "",
  amount: 0.00,
  categoryId: "1",
  type: "expense",
  date: "",
  recurrence: "one-time"
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onClickHomeBtn = this.onClickHomeBtn.bind(this);
    this.onClickAddTransactionBtn = this.onClickAddTransactionBtn.bind(this);
    this.onClickPrevWeekBtn = this.onClickPrevWeekBtn.bind(this);
    this.onClickCurrentWeekBtn = this.onClickCurrentWeekBtn.bind(this);
    this.onClickNextWeekBtn = this.onClickNextWeekBtn.bind(this);
    this.onCancelAddTransactionForm = this.onCancelAddTransactionForm.bind(this);
    this.onSubmitAddTransactionForm = this.onSubmitAddTransactionForm.bind(this);
    this.onClickTransactionEditBtn = this.onClickTransactionEditBtn.bind(this);
    this.onClickTransactionDeleteBtn = this.onClickTransactionDeleteBtn.bind(this);
    this.state = {
      addTransactionFormVisible: false,
      transaction: _.cloneDeep(emptyTransaction),
      categories: [],
      week: 0,
      period: PeriodSvc.getPeriod(0),
      currentDate: PeriodSvc.getCurrentDateString(),
      weekDays: PeriodSvc.getWeekDays(0),
      transactions: [],
    };
  }

  /*
  *********************
  * Navbar methods    *
  *********************
  */
  onClickHomeBtn() {
    this.setState({
      transaction: {
        description: "",
        categoryId: "1",
        type: "expense",
        date: "",
        recurrence: "one-time"
      }
    });
    this.toggleAddTransactionFormVisible(false);
  }

  onClickAddTransactionBtn() {
    this.toggleAddTransactionFormVisible(true);
  }

  onClickPrevWeekBtn() {
    this.updateWeekInfo(this.state.week - 1);
  }

  onClickCurrentWeekBtn() {
    this.updateWeekInfo(0);
  }

  onClickNextWeekBtn() {
    this.updateWeekInfo(this.state.week + 1);
  }

  /*
  *********************
  * Forms methods     *
  *********************
  */
  onSubmitAddTransactionForm(formTransaction) {
    TransactionSvc.create(formTransaction).then(() => {
      this.setState({ transaction: _.cloneDeep(emptyTransaction) });
      this.toggleAddTransactionFormVisible(false);
    });
  }

  onCancelAddTransactionForm() {
    this.setState({ transaction: _.cloneDeep(emptyTransaction) });
    this.toggleAddTransactionFormVisible(false);
  }

  onClickTransactionEditBtn(transactionId) {
    // TODO: Implement edit
    console.log(`edit: ${transactionId}`);
  }

  onClickTransactionDeleteBtn(transactionId) {
    // TODO: Implement delete
    console.log(`delete: ${transactionId}`);
  }

  /*
  *********************
  * ReactJS methods   *
  *********************
  */
  componentDidMount() {
    Databases.categories.allDocs({ include_docs: true })
      .then(({ rows }) => {
        const categories = rows.map(({ doc }) => doc);
        this.setState({ categories: categories });
      });
    this.fetchTransactions();
  }

  componentDidUpdate(_, prevState) {
    if (prevState.week !== this.state.week || prevState.transaction !== this.state.transaction)
      this.fetchTransactions();
  }

  /*
  *********************
  * Internal methods  *
  *********************
  */
  toggleAddTransactionFormVisible(value) {
    this.setState({ addTransactionFormVisible: value });
  }

  updateWeekInfo(newWeek) {
    this.setState({
      week: newWeek,
      period: PeriodSvc.getPeriod(newWeek),
      weekDays: PeriodSvc.getWeekDays(newWeek)
    });
  }

  fetchTransactions() {
    const { startDate, endDate } = this.state.period;
    TransactionSvc.list(startDate, endDate)
      .then(transactions => {
        this.setState({ transactions });
      });
  }

  render() {
    const weekDays = this.state.weekDays;
    const currentDate = this.state.currentDate;
    const transactions = this.state.transactions;
    const periodText = PeriodSvc.periodToString(this.state.period);
    const addTransactionFormVisible = this.state.addTransactionFormVisible;
    const weeklyTransactions = transactions.filter(t => {
      const startDate = weekDays[0].date;
      const endDate = weekDays[weekDays.length - 1].date;
      return t.date >= startDate && t.date <= endDate;
    });
    const totalIncome = transactions
      .filter(t => t.type === "income")
      .reduce((acc, t) => acc + t.amount, 0);
    const totalExpenses = transactions
      .filter(t => t.type === "expense")
      .reduce((acc, t) => acc + t.amount, 0);
    const defaults = {
      dailyTotals: Array(7).fill().map(() => ({ income: 0, expenses: 0 })),
      dailyTransactions: Array(7).fill().map(() => [])
    }
    const { dailyTotals, dailyTransactions } = weeklyTransactions.reduce((acc, t) => {
      const day = PeriodSvc.getWeekModDate(t.date);
      acc.dailyTransactions[day].push(t);
      if (t.type === "income")
        acc.dailyTotals[day].income += t.amount;
      else
        acc.dailyTotals[day].expenses += t.amount;
      return acc;
    }, defaults);
    return (
      <div className="App">
        <Navbar
          periodText={periodText}
          onClickHomeBtn={this.onClickHomeBtn}
          onClickAddTransactionBtn={this.onClickAddTransactionBtn}
          onClickPrevWeekBtn={this.onClickPrevWeekBtn}
          onClickCurrentWeekBtn={this.onClickCurrentWeekBtn}
          onClickNextWeekBtn={this.onClickNextWeekBtn} />
        <WeekHeader
          currentDate={currentDate}
          weekDays={weekDays} />
        <section className="App-main">
          <Period
            dailyTransactions={dailyTransactions}
            onClickTransactionEditBtn={this.onClickTransactionEditBtn}
            onClickTransactionDeleteBtn={this.onClickTransactionDeleteBtn} />
        </section>
        <WeekFooter dailyTotals={dailyTotals} />
        <PeriodFooter
          totalIncome={totalIncome}
          totalExpenses={totalExpenses} />
        {
          addTransactionFormVisible && (
            <AddTransactionForm
              transaction={this.state.transaction}
              categories={this.state.categories}
              onFormCancel={this.onCancelAddTransactionForm}
              onFormSubmit={this.onSubmitAddTransactionForm} />
          )
        }
      </div>
    );
  }
}

export default App;
