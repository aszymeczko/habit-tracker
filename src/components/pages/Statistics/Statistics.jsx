import { useState } from "react";
import { useSelector } from "react-redux";
import BarChart from "../../common/Chart/BarChart.jsx";

const Statistics = () => {
  const habits = useSelector((state) => state.habit.data || []);
  console.log(habits);
  const [weekOffset, setWeekOffset] = useState(0);

  return (
    <div>
      <h2>Weekly statistics</h2>
      <div style={{ marginBottom: 16 }}>
        <button onClick={() => setWeekOffset(weekOffset - 1)}>Last week</button>
        <button
          onClick={() => setWeekOffset(weekOffset + 1)}
          style={{ marginLeft: 8 }}
        >
          Next week
        </button>
        <button onClick={() => setWeekOffset(0)} style={{ marginLeft: 8 }}>
          Current week
        </button>
      </div>

      <BarChart habits={habits} weekOffset={weekOffset} />
    </div>
  );
};

export default Statistics;
