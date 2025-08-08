import { useState, useEffect } from "react";
import SideBar from "../../views/SideBar/SideBar.jsx";
import { useDispatch, useSelector } from "react-redux";
import AddHabitModal from "./AddHabitModal.jsx";
import { Box, Typography, Paper, Button, LinearProgress } from "@mui/material";
import {
  fetchHabits,
  deleteHabit,
  updateHabitProgress,
  createHabit,
} from "../../../features/habits/habitsSlice.jsx";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const habits = useSelector((state) => state.habit.data);
  const loading = useSelector((state) => state.habit.loading);
  const error = useSelector((state) => state.habit.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHabits()); // Pobierz nawyki po zamontowaniu komponentu
  }, [dispatch]);

  // Obsługa otwierania/zamykania modala
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleCardClick = (
    habitId,
    isCompletedToday,
    currentProgress,
    goal,
  ) => {
    const today = new Date().toISOString().split("T")[0]; // Dzisiejsza data

    if (isCompletedToday) {
      alert("Ten nawyk został już dzisiaj wykonany!");
      return; // Zatrzymujemy, jeśli nawyk został już wykonany dzisiaj
    }

    if (currentProgress >= goal) {
      alert("Gratulacje! Cel już osiągnięty 🎉");
      return; // Nie pozwalaj na zwiększenie ponad cel
    }

    dispatch(
      updateHabitProgress({
        id: habitId,
        progress: currentProgress + 1,
        isCompletedToday: true,
        lastCompletedDate: today,
      }),
    );
  };

  const handleUndoClick = (
    habitId,
    currentProgress,
    isCompletedToday,
    lastCompletedDate,
  ) => {
    const today = new Date().toISOString().split("T")[0]; // Dzisiejsza data w formacie ISO

    if (!isCompletedToday || lastCompletedDate !== today) {
      alert("Możesz cofnąć tylko dzisiejsze wykonanie nawyku!");
      return; // Zatrzymujemy, jeśli dzisiejszy dzień nie jest oznaczony
    }

    if (currentProgress > 0) {
      dispatch(
        updateHabitProgress({
          id: habitId,
          progress: currentProgress - 1,
          isCompletedToday: false,
          lastCompletedDate: null,
        }),
      );
    } else {
      alert("Postęp już wynosi 0.");
    }
  };

  const handleDeleteHabit = (habitId) => {
    dispatch(deleteHabit(habitId));
  };

  return (
    <>
      <SideBar />
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
      {/*Modal*/}
      <AddHabitModal open={isModalOpen} onClose={handleCloseModal} />

      {/* Obsługa błędów i ładowania */}
      {loading && <Typography>Ładowanie danych...</Typography>}
      {error && <Typography color="error">Błąd: {error}</Typography>}

      {/* Habit list */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          mt: 4,
        }}
      >
        {habits.map((habit) => {
          const today = new Date().toISOString().split("T")[0]; // Dzisiejsza data
          const isGoalReached = habit.progress >= habit.goal; // Czy osiągnięto cel?

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
                )
              }
              sx={{
                position: "relative",
                width: "300px",
                height: "250px",
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
              {/* Przycisk usuwania */}
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
                <CloseIcon /> {/* Ikona zamknięcia */}
              </IconButton>
              {/* Tytuł nawyku */}
              <Typography
                variant="h4"
                sx={{
                  height: "50px",
                  flexGrow: 1,
                  mt: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {habit.name}
              </Typography>
              {/* Progress bar */}
              <LinearProgress
                variant="determinate"
                value={(habit.progress / habit.goal) * 100}
                sx={{
                  width: "100%",
                  mt: 1,
                  borderRadius: " 16px",
                  height: "10px",
                  // Dynamiczny kolor wypełnienia
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#C8B6FF",
                  },
                  // Dynamiczne tło lub ramka
                  backgroundColor: "#e0e0e0",
                  border: "1px solid #000",
                  transition: "0.3s", // Płynna zmiana koloru
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
              {/* Przycisk Undo */}
              <Button
                onClick={(e) => {
                  e.stopPropagation(); // Zapobiega propagacji kliknięcia na główną kartę
                  handleUndoClick(
                    habit.id,
                    habit.progress,
                    habit.isCompletedToday,
                    habit.lastCompletedDate,
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
