import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Card, CardContent } from "@mui/material";

const BarChart = ({ habits = [], weekOffset }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // Oblicz daty dla danego tygodnia (zwrot: YYYY-MM-DD)
  const getWeekDays = (offset) => {
    const today = new Date();
    const currentDay = today.getDay();
    const monday = new Date(today);
    const daysToMonday = (currentDay + 6) % 7;
    monday.setDate(today.getDate() - daysToMonday + offset * 7);

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d.toISOString().split("T")[0];
    });
  };

  const weekDays = getWeekDays(weekOffset);

  // zamienia creationDate (z czasem) -> YYYY-MM-DD
  const toDateOnly = (dateValue) => {
    if (!dateValue) return null;
    const d = new Date(dateValue);
    if (isNaN(d)) return null;
    return d.toISOString().split("T")[0];
  };

  // przygotuj dane dla wykresu (liczymy tylko "active" nawyki, które istniały danego dnia)
  const chartData = weekDays.map((day) => {
    const activeHabits = habits.filter((habit) => {
      const creationDay = toDateOnly(habit.creationDate);
      return creationDay <= day;
    });

    const completedCount = activeHabits.filter((habit) =>
      (habit.completedDates || []).includes(day),
    ).length;

    const percent =
      activeHabits.length > 0
        ? Math.round((completedCount / activeHabits.length) * 100)
        : 0;

    return {
      day,
      percent,
      completed: completedCount,
      activeCount: activeHabits.length,
    };
  });

  const labels = weekDays.map((d) =>
    new Date(d).toLocaleDateString("pl-PL", {
      weekday: "short",
      day: "2-digit",
    }),
  );

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "% of habits completed",
            data: chartData.map((c) => c.percent),
            backgroundColor: "#A2D2FF",
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Weekly Habits Progress",
            font: {
              size: 18,
            },
            color: "#333",
          },
          tooltip: {
            callbacks: {
              title: () => "",
              label: (context) => {
                const percent = context.formattedValue + "%";
                const day = weekDays[context.dataIndex];

                // ponownie obliczamy activeHabits w tooltip (tak by tooltip był zgodny z wykresem)
                const activeHabits = habits.filter((habit) => {
                  if (!habit.creationDate) return true;
                  const creationDay = toDateOnly(habit.creationDate);
                  if (!creationDay) return true;
                  return creationDay <= day;
                });

                const completedHabits = activeHabits.filter((h) =>
                  (h.completedDates || []).includes(day),
                );

                const countInfo = `${completedHabits.length}/${activeHabits.length}`;

                return [
                  `${percent} (${countInfo})`,
                  ...completedHabits.map((h) => `• ${h.name}`),
                ];
              },
            },
          },
          legend: {
            display: true,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: (value) => `${value}%`,
            },
          },
        },
      },
    });
  }, [habits, weekOffset]); // zmiana danych -> przebuduj wykres

  return (
    <Card sx={{ maxWidth: 900 }}>
      <CardContent>
        <canvas ref={chartRef} style={{ width: "100%", height: 400 }} />
      </CardContent>
    </Card>
  );
};

export default BarChart;
