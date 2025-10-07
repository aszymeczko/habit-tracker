import { useState } from "react";
import { useSelector } from "react-redux";
import BarChart from "../../common/Chart/BarChart.jsx";
import { Box, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DoughnutChartList from "../../common/Chart/DoughnutChartList.jsx";

const Statistics = () => {
  const habits = useSelector((state) => state.habit.data || []);
  console.log(habits);
  const [weekOffset, setWeekOffset] = useState(0);

  return (
    <Box>
      <Box>
        <IconButton onClick={() => setWeekOffset(weekOffset - 1)}>
          {"<"}
        </IconButton>
        <Button
          onClick={() => setWeekOffset(0)}
          style={{ marginLeft: 8, color: "black" }}
        >
          Current week
        </Button>
        <IconButton
          onClick={() => setWeekOffset(weekOffset + 1)}
          style={{ marginLeft: 8 }}
        >
          {">"}
        </IconButton>
      </Box>

      <BarChart habits={habits} weekOffset={weekOffset} />
      <DoughnutChartList habits={habits} />
    </Box>
  );
};

export default Statistics;
