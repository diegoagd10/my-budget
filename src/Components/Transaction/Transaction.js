import './Transaction.css';

function Transaction({
  transaction,
  onClickTransactionEditBtn,
  onClickTransactionDeleteBtn
}) {
  const transactionClasName = transaction.type === "income" ?
    "transaction-income" : "transaction-expense";
  return (
    <div className="card">
      <div className="card-content">
        <h2 className={`title is-4 ${transactionClasName}`}>
          ${transaction.amount.toFixed(2)}
        </h2>
        <h3 className="subtitle is-5">
          {transaction.description}
        </h3>
      </div>
      <footer className="card-footer">
        <a
          href="#"
          className="card-footer-item"
          onClick={() => onClickTransactionEditBtn(transaction._id)}>
          Edit
        </a>
        <a
          href="#"
          className="card-footer-item"
          onClick={() => onClickTransactionDeleteBtn(transaction._id)}>
          Delete
        </a>
      </footer>
    </div>
  );
}

export default Transaction;
