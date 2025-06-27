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

  const handleCardClick = (habitId, currentProgress, goal) => {
    if (currentProgress >= goal) {
      alert("Gratulacje! Cel już osiągnięty 🎉");
      return; // Nie pozwalaj na zwiększenie ponad cel
    }

    dispatch(
      updateHabitProgress({
        id: habitId,
        progress: currentProgress + 1,
      }),
    );
  };

  const handleUndoClick = (habitId, currentProgress) => {
    if (currentProgress > 0) {
      const newProgress = currentProgress - 1; // Zmniejszamy postęp
      const isCompletedToday = newProgress > 0;

      dispatch(
        updateHabitProgress({
          id: habitId,
          progress: newProgress,
          isCompletedToday,
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
              backgroundColor: "#9C7CA5",
              color: "#F6E2D3", // Kolor ikony po najechaniu
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
          const isCompletedToday = habit.isCompletedToday; // Flaga dla koloru na dziś

          return (
            <Paper
              key={habit.id}
              elevation={3}
              onClick={() =>
                handleCardClick(habit.id, habit.progress, habit.goal)
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
                backgroundColor: isCompletedToday ? "#9C7CA5" : "#f0f0f0",
                gap: 1,
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: isCompletedToday ? "#835a91" : "#e0e0e0",
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
                  color: habit.isCompletedToday ? "#F6E2D3" : "#A9746E",
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
                  // backgroundColor: "#F6E2D3",
                  borderRadius: " 16px",
                  height: "10px",
                  // Dynamiczny kolor wypełnienia
                  "& .MuiLinearProgress-bar": {
                    // backgroundColor: "#F6E2D3",
                    backgroundColor: habit.isCompletedToday
                      ? "#F6E2D3"
                      : "#A9746E",
                  },
                  // Dynamiczne tło lub ramka
                  backgroundColor: habit.isCompletedToday
                    ? "#9C7CA5"
                    : "#e0e0e0",
                  border: habit.isCompletedToday
                    ? "2px solid #835a91"
                    : "2px solid transparent",
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
                  handleUndoClick(habit.id, habit.progress, habit.goal);
                }}
                sx={{
                  backgroundColor: "#f0f0f0",
                  // color: "#A9746E",
                  color: habit.isCompletedToday ? "#9C7CA5" : "#A9746E",
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
