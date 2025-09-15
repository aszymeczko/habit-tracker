import { Box, List, ListItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Calendar from "../Calendar/Calendar.jsx";
import { fetchHabits } from "../../../features/habitsSlice.jsx";

const Habits = () => {
  const dispatch = useDispatch();
  const { data: habits, loading, error } = useSelector((state) => state.habit);

  const [selectedHabit, setSelectedHabit] = useState(null); // Wybrany nawyk

  // Obsługa ładowania i błędów
  if (loading) {
    return <p>Ładowanie danych...</p>;
  }

  if (error) {
    return <p>Wystąpił błąd: {error}</p>;
  }

  return (
    <Box sx={{ display: "flex", gap: 3, my: 4 }}>
      <Box sx={{ flex: 1 }}>
        <List
          sx={{
            padding: 2,
            mt: 15,
          }}
        >
          {habits.map((habit) => (
            <ListItem
              key={habit.id}
              component="button"
              selected={selectedHabit?.id === habit.id}
              onClick={() => setSelectedHabit(habit)}
              sx={{
                backgroundColor:
                  selectedHabit?.id === habit.id ? habit.color : "inherit",
                "&:hover": {
                  backgroundColor:
                    selectedHabit?.id === habit.id ? habit.color : "#e0e0e0",
                  cursor: "pointer",
                },
                padding: "12px 16px",
                mb: 2,
                borderRadius: 2,
                border: "1px solid #ccc",
                justifyContent: "center",
                fontSize: "16px",
              }}
            >
              {habit.name}
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ flex: 4 }}>
        <Calendar highlightedDays={selectedHabit || {}} />
      </Box>
    </Box>
  );
};

export default Habits;
