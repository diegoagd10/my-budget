import './WeekHeader.css';

function WeekHeader({ currentDate, weekDays }) {
  const currentDateStyle = (date) => date === currentDate ? { color: "rgb(0,104,223)" } : {};
  const dayHeaderComponents = weekDays.map(({ name, dateText }, id) => {
    return (
      <div key={id} className="column">
        <h2 className="title is-5 WeekHeader-title" style={currentDateStyle(dateText)}>
          {name}
        </h2>
        <h2 className="title is-5 WeekHeader-title" style={currentDateStyle(dateText)}>
          {dateText}
        </h2>
      </div>
    );
  });
  return (
    <div className="WeekHeader-main">
      <div className="columns">{dayHeaderComponents}</div>
    </div>
  );
}

export default WeekHeader;
