import CalendarHeader from "./CalendarHeader.jsx";
import CalendarGrid from "./CalendarGrid.jsx";
import { getMonthDays } from "../../../utils/utils.jsx";
import { useState } from "react";

const Calendar = () => {
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const currentDate = new Date(); // Pobranie aktualnej daty

  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear()); // Bieżący rok
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth()); // Bieżący miesiąc

  const days = getMonthDays(currentYear, currentMonth);

  return (
    <div>
      <CalendarHeader
        currentYear={currentYear}
        currentMonth={currentMonth}
        onNext={goToNextMonth}
        onPrevious={goToPreviousMonth}
      />
      <CalendarGrid days={days} />
    </div>
  );
};

export default Calendar;
