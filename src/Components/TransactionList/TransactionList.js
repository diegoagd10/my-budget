import Transaction from "../Transaction/Transaction";
import './TransactionList.css';

function TransactionList({
  transactions,
  onClickTransactionEditBtn,
  onClickTransactionDeleteBtn
}) {
  const transactionsComponents = transactions.map((transaction) => {
    return (<div className="block" key={transaction._id}>
      <Transaction
        transaction={transaction}
        onClickTransactionEditBtn={onClickTransactionEditBtn}
        onClickTransactionDeleteBtn={onClickTransactionDeleteBtn} />
    </div>);
  });
  return (<section>{transactionsComponents}</section>);
}

export default TransactionList;
