import Box from "@mui/material/Box";
import { memo } from "react";
import StarIcon from "@mui/icons-material/Star";
import Tooltip from "@mui/material/Tooltip";

const CalendarGrid = memo(({ days, highlightedDays }) => {
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
              ? highlightedDays[day.date] || "primary.light"
              : "grey.300",
            textAlign: "center",
          }}
        >
          {day.day}
        </Box>
      ))}
    </Box>
  );
});

export default CalendarGrid;
