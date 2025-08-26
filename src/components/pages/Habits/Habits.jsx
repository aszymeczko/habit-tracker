import { Box, List, ListItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Calendar from "../Calendar/Calendar.jsx";
import { fetchHabits } from "../../../features/habitsSlice.jsx";

const Habits = () => {
  const dispatch = useDispatch();
  const { data: habits, loading, error } = useSelector((state) => state.habit);

  const [selectedHabit, setSelectedHabit] = useState(null); // Wybrany nawyk

  // Pobierz dane podczas ładowania komponentu
  useEffect(() => {
    dispatch(fetchHabits()); // Funkcja pobierająca dane z API
  }, [dispatch]);

  // Obsługa ładowania i błędów
  if (loading) {
    return <p>Ładowanie danych...</p>;
  }

  if (error) {
    return <p>Wystąpił błąd: {error}</p>;
  }

  return (
    <Box sx={{ display: "flex", gap: 3 }}>
      <Box sx={{ flex: 1 }}>
        <List>
          {habits.map((habit) => (
            <ListItem
              key={habit.id}
              component="button"
              selected={selectedHabit?.id === habit.id}
              onClick={() => setSelectedHabit(habit)}
            >
              {habit.name} ({habit.progress}/ {habit.goal})
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ flex: 3 }}>
        <Calendar highlightedDays={selectedHabit || {}} />
      </Box>
    </Box>
  );
};

export default Habits;
