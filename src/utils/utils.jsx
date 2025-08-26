// Funkcja generująca tablicę dni w miesiącu

export const getMonthDays = (year, month) => {
  const days = [];
  let firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  // Ustawiamy poniedziałek jako pierwszy dzień tygodnia
  firstDay = (firstDay + 6) % 7;

  // Dodaj puste sloty dla dni poprzedniego miesiąca
  for (let i = 0; i < firstDay; i++) {
    days.push({ day: null, isCurrentMonth: false });
  }

  // Dodaj dni miesiąca z datą w formacie YYYY-MM-DD
  for (let day = 1; day <= lastDate; day++) {
    const currentDate = new Date(year, month, day);
    const date = currentDate.toLocaleDateString("sv-SE");
    days.push({ day, isCurrentMonth: true, date });
  }

  return days;
};
2;
// Funkcja przypisująca kolejne kolory na zasadzie sekwencji

// Paleta kolorów
const habitColors = ["#C8B6FF", "#A2D2FF", "#FFC8DD", "#B5EAD7", "#FFDAC1"];

// Globalny indeks, który śledzi aktualny kolor
let colorIndex = 0;

export const getNextColor = () => {
  const color = habitColors[colorIndex];
  colorIndex = (colorIndex + 1) % habitColors.length; // Zapętlaj indeks
  return color;
};
