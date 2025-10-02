import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const BarChart = ({ habits, weekOffset }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // Oblicz daty dla danego tygodnia
  const getWeekDays = (offset) => {
    const today = new Date();
    const currentDay = today.getDay(); // niedziela = 0, poniedziałek = 1, ...
    const monday = new Date(today);
    monday.setDate(today.getDate() - currentDay + 1 + offset * 7);

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d.toISOString().split("T")[0];
    });
  };

  const weekDays = getWeekDays(weekOffset);

  // przygotuj dane dla wykresu
  const chartData = weekDays.map((day) => {
    const completedCount = habits.filter((habit) =>
      habit.completedDates.includes(day),
    ).length;
    const percent =
      habits.length > 0
        ? Math.round((completedCount / habits.length) * 100)
        : 0;
    return { day, percent, completed: completedCount };
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
            label: "Procent wykonanych nawyków",
            data: chartData.map((c) => c.percent),
            backgroundColor: "#A2D2FF",
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              title: () => "", // brak daty
              label: (context) => {
                const percent = context.formattedValue + "%";
                const day = weekDays[context.dataIndex];
                const completedHabits = habits.filter((habit) =>
                  habit.completedDates.includes(day),
                );

                const countInfo = `${completedHabits.length}/${habits.length}`;

                if (completedHabits.length === 0) {
                  return [
                    `${percent} (${countInfo})`,
                    "Brak ukończonych nawyków",
                  ];
                }

                return [
                  `${percent} (${countInfo})`, // np. "67% (5/6)"
                  ...completedHabits.map((h) => `• ${h.name}`),
                ];
              },
            },
          },

          legend: {
            display: false,
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
  }, [habits, weekOffset]);

  return <canvas ref={chartRef}></canvas>;
};

export default BarChart;
