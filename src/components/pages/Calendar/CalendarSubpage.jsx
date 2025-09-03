import Calendar from "./Calendar";
import StarIcon from "@mui/icons-material/Star";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";

const CalendarSubpage = () => {
  const { data: habits, loading, error } = useSelector((state) => state.habit);
  habits.forEach((habit) => console.log(habit.color));
  if (loading) {
    return <p>Ładowanie danych...</p>;
  }
  if (error) {
    return <p>Wystąpił błąd: {error}</p>;
  }

  return (
    <Box>
      <Box sx={{ mb: "30px" }}>
        <Calendar />
      </Box>
      <Box sx={{ display: "flex", gap: "40px" }}>
        {habits.map((habit) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <StarIcon
              key={habit.id}
              sx={{ fontSize: 28, color: habit.color, mr: "4px" }}
            />
            <Typography sx={{ fontSize: "18px", pt: "1,5px" }}>
              {habit.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CalendarSubpage;
