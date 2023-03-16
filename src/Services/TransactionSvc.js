import moment from "moment";
import { v4 as uuid } from "uuid";
import Databases from "../Database/Databases";
import PeriodSvc from "./PeriodSvc";

class TransactionSvc {
  async create(transaction) {
    const date = moment(transaction.date);
    const recurrence = transaction.recurrence;
    const transactionDb = {
      ...transaction,
      date: date.toDate().getTime(),
      amount: parseFloat(transaction.amount),
      _id: uuid()
    };
    if (recurrence !== "one-time") {
      transactionDb.startDate = date.toDate().getTime();
      transactionDb.endDate = date.add(5, "years").toDate().getTime();
    }
    try {
      await Databases.transactions.put(transactionDb);
    } catch (error) {
      console.error(error);
      throw Error(error);
    }
  }

  async list(startDate, endDate) {
    try {
      const startTime = startDate.getTime();
      const endTime = endDate.getTime();
      const transactions = (await Databases.transactions.find({
        selector: {
          date: { $gte: startTime, $lte: endTime },
          recurrence: "one-time"
        },
        sort: [
          { date: 'asc', amount: 'asc' }
        ]
      })).docs;
      const scheduledTransactions = await Databases.transactions.find({
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
      for (const transaction of scheduledTransactions.docs) {
        if (transaction.startDate) {
          let date = PeriodSvc.getMonthDate(transaction.startDate);
          while (date.getTime() <= endTime) {
            if (date.getTime() >= startTime) {
              transactions.push({
                ...transaction,
                _id: uuid(),
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