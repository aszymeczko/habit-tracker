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

  // Dodaj dni miesiąca z pełną datą w formacie YYYY-MM-DD
  for (let day = 1; day <= lastDate; day++) {
    const date = new Date(year, month, day).toISOString().split("T")[0]; // Generowanie daty w formacie YYYY-MM-DD
    days.push({ day, isCurrentMonth: true, date });
  }

  return days;
}
