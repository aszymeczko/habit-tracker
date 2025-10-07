import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Card, CardContent, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

const SingleDoughnutChart = ({ habit = [] }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const completed = habit.completedDates?.length || 0;
  const goal = habit.goal || 1;
  const percent = Math.round((completed / goal) * 100);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Progress", "Remaining"],
        datasets: [
          {
            data: [percent, 100 - percent],
            backgroundColor: [habit.color || "#A2D2FF", "#E0E0E0"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        cutout: "70%",
        plugins: {
          tooltip: {
            enabled: false,
          },
          legend: {
            display: false,
          },
        },
      },
    });
  }, [habit, percent]);

  return (
    <Card
      sx={{
        width: 210,
        height: 260,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        boxShadow: 3,
        borderRadius: 4,
      }}
    >
      <Typography variant="h6" sx={{ mb: 1, textAlign: "center" }}>
        {habit.name}
      </Typography>
      <div style={{ position: "relative", width: 120, height: 120 }}>
        <canvas ref={chartRef} />
        <Typography
          variant="h6"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontWeight: "bold",
          }}
        >
          {percent}%
        </Typography>
      </div>
      <Typography variant="body2" sx={{ mt: 1, color: "#555" }}>
        {completed}/{goal} dni
      </Typography>
    </Card>
  );
};

const DoughnutChartList = ({ habits = [] }) => {
  return (
    <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
      {habits.map((habit) => (
        <Grid item key={habit.id}>
          <SingleDoughnutChart habit={habit} />
        </Grid>
      ))}
    </Grid>
  );
};

export default DoughnutChartList;
