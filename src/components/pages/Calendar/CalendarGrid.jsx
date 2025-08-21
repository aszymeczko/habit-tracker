import Box from "@mui/material/Box";

const CalendarGrid = ({ days, highlightedDays }) => {
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2 }}>
      {weekDays.map((day) => (
        <Box
          key={day}
          sx={{
            p: 2,
            fontWeight: "bold",
            textAlign: "center",
            color: "grey.700",
          }}
        >
          {day}
        </Box>
      ))}
      {days.map((day, index) => (
        <Box
          key={index}
          sx={{
            p: 2,
            bgcolor: day.isCurrentMonth
              ? highlightedDays.includes(day.date)
                ? "#C8B6FF"
                : "primary.light"
              : "grey.300",
            // color: day.highlightedDays ? "#C8B6FF" : "#000",
            textAlign: "center",
          }}
        >
          {day.day}
        </Box>
      ))}
    </Box>
  );
};

export default CalendarGrid;
