import moment from "moment";
import { v4 as uuid } from "uuid";
import Databases from "../Database/Databases";
import PeriodSvc from "./PeriodSvc";

const handleError = (error) => {
  console.error(error);
  throw new Error(`An error occurred at TransactionSvc: ${error.message}`);
};

async function fetchTransactions(startTime, endTime) {
  return (await Databases.transactions.find({
    selector: {
      date: { $gte: startTime, $lte: endTime },
      recurrence: "one-time"
    },
    sort: [
      { date: 'asc', amount: 'asc' }
    ]
  })).docs;
};

async function fetchScheduledTransactions(endTime, startTime) {
  return await Databases.transactions.find({
    selector: {
      recurrence: { $ne: "one-time" },
      $not: {
        $or: [
          { startDate: { $gt: endTime } },
          { endDate: { $lt: startTime } },
        ]
      }
    }
  });
}

class TransactionSvc {
  async create(transaction) {
    const date = moment(transaction.date).toDate().getTime();
    const recurrence = transaction.recurrence;
    const transactionDb = {
      ...transaction,
      date: date,
      amount: parseFloat(transaction.amount),
      _id: uuid()
    };
    if (recurrence !== "one-time") {
      transactionDb.startDate = date;
      transactionDb.endDate = moment(transaction.date).add(5, "years").toDate().getTime();
    }
    try {
      await Databases.transactions.put(transactionDb);
    } catch (error) {
      handleError(error);
    }
  }

  async remove(transactionId, rev) {
    try {
      const result = await Databases.transactions.remove(transactionId, rev);
      return result.ok;
    } catch (error) {
      handleError(error);
    }
  }

  async list(startDate, endDate) {
    try {
      const startTime = startDate.getTime();
      const endTime = endDate.getTime();
      const transactions = await fetchTransactions(startTime, endTime);
      const scheduledTransactions = await fetchScheduledTransactions(endTime, startTime);
      for (const transaction of scheduledTransactions.docs) {
        if (transaction.startDate) {
          let date = PeriodSvc.getMonthDate(transaction.startDate);
          while (date.getTime() <= endTime) {
            if (date.getTime() >= startTime) {
              transactions.push({
                ...transaction,
                _id: uuid(),
                groupId: { 
                  _id: transaction._id,
                  _rev: transaction._rev
                },
                date: date.getTime()
              });
            }
            date = moment(date);
            if (transaction.recurrence === "daily") {
              date = date.add(1, "days").toDate();
            } else if (transaction.recurrence === "weekly") {
              date = date.add(7, "days").toDate();
            } else if (transaction.recurrence === "bi-weekly") {
              date = date.add(14, "days").toDate();
            } else {
              date = date.add(1, "months").toDate();
            }
          }
        }
      }
      return transactions.map(t => {
        t.jsDate = moment(t.date).toDate();
        return t;
      });
    } catch (error) {
      console.error(error);
      throw Error(error);
    }
  }
}

const transactionSvc = new TransactionSvc();
export default transactionSvc;

