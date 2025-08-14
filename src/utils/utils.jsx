// Funkcja generująca tablicę dni w miesiącu

export function getMonthDays(year, month) {
  const days = [];
  let firstDay = new Date(year, month, 1).getDay(); // Jaki dzień tygodnia przypada pierwszy dzień miesiąca
  const lastDate = new Date(year, month + 1, 0).getDate(); // Liczba dni w miesiącu

  firstDay = (firstDay + 6) % 7;

  // Dodaj puste sloty dla dni poprzedniego miesiąca
  for (let i = 0; i < firstDay; i++) {
    days.push({ day: null, isCurrentMonth: false });
  }

  // Dodaj dni miesiąca
  for (let day = 1; day <= lastDate; day++) {
    days.push({ day, isCurrentMonth: true });
  }

  return days;
}
