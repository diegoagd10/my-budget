import TransactionList from "../TransactionList/TransactionList";
import './Period.css';

function Period({
  dailyTransactions,
  onClickTransactionEditBtn,
  onClickTransactionDeleteBtn
}) {
  const transactionsLists = dailyTransactions.map((transactions, idx) => {
    return (
      <div className="column" key={`period_container_${idx}`}>
        <TransactionList
          transactions={transactions}
          onClickTransactionEditBtn={onClickTransactionEditBtn}
          onClickTransactionDeleteBtn={onClickTransactionDeleteBtn} />
      </div>
    );
  });
  return (
    <div>
      <div className="columns">
        {transactionsLists}
      </div>
    </div>
  );
}

export default Period;
