import Box from "@mui/material/Box";
import { memo } from "react";
import Tooltip from "@mui/material/Tooltip";
import StarIcon from "@mui/icons-material/Star";
import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";

const CalendarGrid = memo(({ days, highlightedDays }) => {
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const location = useLocation();

  const isCalendarPage = location.pathname === "/calendar";

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2 }}>
      {/* Dni tygodnia */}
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

      {/* Dni miesiąca */}
      {days.map((day, index) => {
        const habits = highlightedDays[day.date] || [];

        return (
          <Box
            key={index}
            sx={{
              p: 2,
              bgcolor: day.isCurrentMonth
                ? isCalendarPage
                  ? "primary.main" // Na podstronie /calendar tło domyślne (bez podświetlenia)
                  : habits.length > 0
                    ? habits[0]?.color || "primary.light" // Kolor nawyków zabarwia dni na /habits
                    : "#FAE7EB" // Domyślne tło dla dni bez wybranego nawyku na /habits
                : "grey.300",

              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              ...(isCalendarPage && {
                minHeight: 85,
                minWidth: 150,
              }),
            }}
          >
            <Typography>{day.day}</Typography>

            {/* /calendar */}
            {isCalendarPage && (
              <Box sx={{ mt: 1, display: "flex", gap: "4px", minHeight: 24 }}>
                {day.isCurrentMonth &&
                  habits.map((habit, idx) => (
                    <Tooltip title={habit.name} key={idx}>
                      <StarIcon sx={{ fontSize: 20, color: habit.color }} />
                    </Tooltip>
                  ))}
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
});

export default CalendarGrid;
