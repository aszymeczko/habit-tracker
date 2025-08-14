const CalendarHeader = ({ currentYear, currentMonth, onNext, onPrevious }) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div>
      <button onClick={onPrevious}>{"<"}</button>
      <span>{`${monthNames[currentMonth]} ${currentYear}`}</span>
      <button onClick={onNext}>{">"}</button>
    </div>
  );
};

export default CalendarHeader;
