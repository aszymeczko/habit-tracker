import CalendarHeader from "./CalendarHeader.jsx";
import CalendarGrid from "./CalendarGrid.jsx";
import { getMonthDays } from "../../../utils/utils.jsx";
import { useState, memo } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Calendar = memo(({ highlightedDays = [] }) => {
  const { data, loading, error } = useSelector((state) => state.habit);
  const location = useLocation();

  const currentDate = new Date(); // Pobranie aktualnej daty

  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear()); // Bieżący rok
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth()); // Bieżący miesiąc

  const days = getMonthDays(currentYear, currentMonth);

  // const localHighlightedDays = Object.fromEntries(
  //     highlightedDays.map(h => [h.date, h.color])
  // );

  const localHighlightedDays =
    location.pathname === "/habits"
      ? Object.fromEntries(highlightedDays.map((h) => [h.date, h.color]))
      : data
          .flatMap((habit) =>
            (habit.completedDates || []).map((date) => ({
              date,
              name: habit.name, // Dodajemy nazwę nawyku
              color: habit.color, // Kolor nawyku
            })),
          )
          .reduce((acc, { date, name, color }) => {
            if (!acc[date]) {
              acc[date] = []; // Inicjalizujemy pustą tablicę, jeśli brak wpisu dla daty
            }
            acc[date].push({ name, color }); // Dodajemy obiekt z nazwą i kolorem
            return acc;
          }, {});

  console.log("localHighlightedDays", localHighlightedDays);

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

  if (loading) {
    return <p>Ładowanie danych...</p>;
  }
  if (error) {
    return <p>Wystąpił błąd: {error}</p>;
  }

  return (
    <div>
      <CalendarHeader
        currentYear={currentYear}
        currentMonth={currentMonth}
        onNext={goToNextMonth}
        onPrevious={goToPreviousMonth}
      />
      <CalendarGrid days={days} highlightedDays={localHighlightedDays} />
    </div>
  );
});

export default Calendar;
