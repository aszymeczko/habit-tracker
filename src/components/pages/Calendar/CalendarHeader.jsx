import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

const CalendarHeader = ({ currentYear, currentMonth, onNext, onPrevious }) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, pb: 2 }}>
      <IconButton onClick={onPrevious} sx={{ fontSize: 30 }}>
        {"<"}
      </IconButton>
      <Typography
        sx={{ fontSize: 23 }}
      >{`${monthNames[currentMonth]} ${currentYear}`}</Typography>
      <IconButton onClick={onNext} sx={{ fontSize: 30 }}>
        {">"}
      </IconButton>
    </Box>
  );
};

export default CalendarHeader;
