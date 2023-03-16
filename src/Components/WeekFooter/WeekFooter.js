import './WeekFooter.css';

function WeekFooter({ dailyTotals }) {
  const transactionComponents = dailyTotals.map(({ income, expenses }, idx) => {
    return (
      <div className="column" key={idx}>
        <b className="WeekFooter-label">Income: </b>
        <span className="WeekFooter-income">${income.toFixed(2)}</span>
        <br></br>
        <b className="WeekFooter-label">Expenses: </b>
        <span className="WeekFooter-expense">${expenses.toFixed(2)}</span>
      </div>
    );
  })
  return (
    <div className="WeekFooter-main">
      <div className="columns">{transactionComponents}</div>
    </div>
  );
}

export default WeekFooter;
