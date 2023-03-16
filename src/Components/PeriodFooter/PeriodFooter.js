import './PeriodFooter.css';

function PeriodFooter(props) {
  const income = props.totalIncome;
  const expenses = props.totalExpenses;
  const available = income - expenses;
  const availableStyle = available >= 0 ? "PeriodFooter-income" : "PeriodFooter-expenses";
  return (
    <footer className="PeriodFooter-main">
      <div className="columns">
        <div className="column">
          <h2 className="title PeriodFooter-label">
            Total Income:
            <span className="PeriodFooter-income"> ${income.toFixed(2)}</span>
          </h2>
        </div>
        <div className="column">
          <h2 className="title PeriodFooter-label">
            Total Expenses:
            <span className="PeriodFooter-expenses"> ${expenses.toFixed(2)}</span>
          </h2>
        </div>
        <div className="column">
          <h2 className="title PeriodFooter-label">
            Available: 
            <span className={availableStyle}> ${available.toFixed(2)}</span>
          </h2>
        </div>
      </div>
    </footer>
  );
}

export default PeriodFooter;
