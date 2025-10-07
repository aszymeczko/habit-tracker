import { useState, useEffect } from "react";
import SideBar from "../../views/SideBar/SideBar.jsx";
import { useDispatch, useSelector } from "react-redux";
import AddHabitModal from "./AddHabitModal.jsx";
import { Box, Typography, Paper, Button, LinearProgress } from "@mui/material";
import {
  fetchHabits,
  deleteHabit,
  updateHabitProgress,
} from "../../../features/habitsSlice.jsx";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const habits = useSelector((state) => state.habit.data);
  const loading = useSelector((state) => state.habit.loading);
  const error = useSelector((state) => state.habit.error);
  const searchQuery = useSelector((state) => state.habit.searchQuery); // pobieramy tekst wyszukiwania z Redux

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

  const handleOpenModal = () => {
    if (habits.length >= 6) {
      alert("You can have a maximum of 6 habits!");
      return;
    }
    setModalOpen(true);
  };
  const handleCloseModal = () => setModalOpen(false);

  const handleCardClick = (
    habitId,
    isCompletedToday,
    currentProgress,
    goal,
    completedDates,
  ) => {
    const today = new Date().toISOString().split("T")[0];

    // Sprawdź, czy jest już wykonane na dziś
    if (isCompletedToday) {
      alert("This habit has already been completed today!");
      return;
    }

    // Sprawdź, czy osiągnięto maksimum
    if (currentProgress >= goal) {
      alert("Congratulations! You've reached your goal 🎉");
      return;
    }
    // Dodaj dzisiejszą datę, jeśli jeszcze jej nie ma w completedDates
    const updatedCompletedDates = [
      ...new Set([...(completedDates || []), today]),
    ];

    dispatch(
      updateHabitProgress({
        id: habitId,
        progress: currentProgress + 1,
        isCompletedToday: true,
        lastCompletedDate: today,
        completedDates: updatedCompletedDates,
      }),
    );
  };

  const handleUndoClick = (
    habitId,
    currentProgress,
    isCompletedToday,
    lastCompletedDate,
    completedDates,
  ) => {
    const today = new Date().toISOString().split("T")[0];

    // Cofanie możliwe, tylko jeśli wykonanie dotyczy dzisiejszego dnia
    if (
      !isCompletedToday ||
      lastCompletedDate !== today ||
      !completedDates.includes(today)
    ) {
      alert("You can only undo today's habit!");
      return;
    }

    if (currentProgress > 0) {
      dispatch(
        updateHabitProgress({
          id: habitId,
          progress: currentProgress - 1,
          isCompletedToday: false,
          lastCompletedDate: currentProgress - 1 > 0 ? lastCompletedDate : null,
          completedDates: completedDates.filter((date) => date !== today),
        }),
      );
    } else {
      alert("Progress is already at 0.");
    }
  };

  const handleDeleteHabit = (habitId) => {
    dispatch(deleteHabit(habitId));
  };

  // filtrowanie listy nawyków
  const filteredHabits = habits.filter((habit) =>
    habit.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <Box
        sx={{
          color: "#576574",
          display: "flex",
          alignItems: "center",
          fontSize: 45,
          my: 4,
        }}
      >
        <Typography
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            fontSize: 45,
            ml: 24,
          }}
        >
          My Habits
        </Typography>
        <Button
          variant="contained"
          onClick={handleOpenModal}
          sx={{
            mb: 2,
            fontSize: 16,
            mr: "50px",
            p: "12px 30px",
            transition: "0.2s",
            "&:hover": {
              backgroundColor: "#A2D2FF",
            },
          }}
        >
          Add Habit
        </Button>
      </Box>

      <AddHabitModal open={isModalOpen} onClose={handleCloseModal} />

      {loading && <Typography>Loading data...</Typography>}
      {error && <Typography color="error">Error: {error}</Typography>}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          mt: 4,
          justifyContent: "center",
        }}
      >
        {filteredHabits.map((habit) => {
          const today = new Date().toISOString().split("T")[0];
          const isGoalReached = habit.progress >= habit.goal;

          return (
            <Paper
              key={habit.id}
              elevation={3}
              onClick={() =>
                handleCardClick(
                  habit.id,
                  habit.isCompletedToday,
                  habit.progress,
                  habit.goal,
                  habit.completedDates,
                )
              }
              sx={{
                position: "relative",
                width: "350px",
                height: "300px",
                padding: 2,
                borderRadius: "16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: isGoalReached
                  ? "#E4CCF1"
                  : habit.isCompletedToday
                    ? "#DBF3FF"
                    : "#f0f0f0",
                gap: 1,
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: isGoalReached
                    ? "#C8B6FF"
                    : habit.isCompletedToday
                      ? "#BDE0FE"
                      : "#D2DCE4",
                },
              }}
            >
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteHabit(habit.id);
                }}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  color: "#000",
                }}
              >
                <CloseIcon />
              </IconButton>

              <Typography
                variant="h4"
                sx={{
                  height: "50px",
                  flexGrow: 1,
                  mt: "10px",
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                {habit.name}
              </Typography>

              <LinearProgress
                variant="determinate"
                value={(habit.progress / habit.goal) * 100}
                sx={{
                  width: "100%",
                  mt: 1,
                  borderRadius: " 16px",
                  height: "10px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#C8B6FF",
                  },
                  backgroundColor: "#e0e0e0",
                  border: "1px solid #000",
                  transition: "0.3s",
                }}
              />

              <Box sx={{ mb: "5px", width: "100%" }}>
                <Typography
                  variant="body1"
                  sx={{ justifyContent: "center", display: "flex" }}
                >
                  Progress: {habit.progress}/{habit.goal} days
                </Typography>
              </Box>

              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleUndoClick(
                    habit.id,
                    habit.progress,
                    habit.isCompletedToday,
                    habit.lastCompletedDate,
                    habit.completedDates,
                  );
                }}
                sx={{
                  backgroundColor: "#f0f0f0",
                  border: "1px solid #576574",
                  color: "#000",
                  mt: 1,
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
              >
                Undo
              </Button>
            </Paper>
          );
        })}
      </Box>
    </>
  );
};

export default Home;
