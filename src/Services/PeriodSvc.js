import moment from "moment";

const periodStartDate = moment.utc("2022-12-22 12:00:00", "YYYY-MM-DD HH:mm:ss");

function isStartPeriod(modDate) {
  return modDate === 0;
}

function isStartWeek(modDate) {
  return modDate === 0;
}

class PeriodSvc {
  getPeriod(noWeeks) {
    const weekDate = this.getWeekDate(noWeeks);
    const periodDay = this.getPeriodModDate(weekDate);
    const startDate = isStartPeriod(periodDay) ? weekDate : weekDate.subtract(periodDay, "days");
    const endDate = moment(startDate).add(13, "days");
    return { startDate: startDate.toDate(), endDate: endDate.toDate() };
  }

  getWeekDays(noWeeks) {
    const weeks = [];
    const weekDate = this.getWeekDate(noWeeks);
    const weekDay = this.getWeekModDate(weekDate);
    const startDate = isStartWeek(weekDay) ? weekDate : weekDate.subtract(weekDay, "days");
    startDate.subtract(1, "days");
    for (let i = 0; i < 7; i++) {
      startDate.add(1, "days");
      weeks.push({
        name: startDate.format('dddd'),
        date: startDate.toDate().getTime(),
        dateText: startDate.format("MM/DD/YYYY")
      });
    }
    return weeks;
  }

  getWeekDate(weeks) {
    const today = moment().startOf("day");
    const days = 7 * weeks;
    return today.add(days, "days");
  }

  getWeekModDate(date) {
    let momentDate = date;
    if (Number.isInteger(date))
      momentDate = moment(date);
    const timeDiff = momentDate.diff(periodStartDate);
    const dayDiff = timeDiff / (1000 * 3600 * 24);
    return Math.floor(dayDiff % 7);
  }

  getMonthDate(startDate) {
    const today = moment().startOf("day");
    const timeDiff = today.diff(moment(startDate));
    return moment(startDate).add(timeDiff, "millis").toDate();
  }

  getPeriodModDate(date) {
    const timeDiff = date.diff(periodStartDate);
    const dayDiff = timeDiff / (1000 * 3600 * 24);
    return Math.floor(dayDiff % 14);
  }

  getCurrentDateString() {
    return moment().startOf("day").format("MM/DD/YYYY");
  }

  periodToString({ startDate, endDate }) {
    const startDateText = moment(startDate).format("MM/DD/YYYY");
    const endDateText = moment(endDate).format("MM/DD/YYYY");
    return `(${startDateText} - ${endDateText})`;
  }
}

const periodSvc = new PeriodSvc();
export default periodSvc;