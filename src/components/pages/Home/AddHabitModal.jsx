import { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { createHabit } from "../../../features/habitsSlice.jsx";
import { getNextColor } from "../../../utils/utils.jsx";

const AddHabitModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");

  const handleSubmit = () => {
    if (name && goal > 0) {
      const color = getNextColor();

      dispatch(
        createHabit({
          name,
          goal,
          progress: 0,
          color,
          lastCompletedDate: null,
          isCompletedToday: false,
          completedDates: [],
        }),
      );

      setName("");
      setGoal("");

      onClose();
    } else {
      alert("Uzupełnij wszystkie pola!");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-habit-modal"
      aria-describedby="add-new-habit-form"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          p: 4,
          borderRadius: "8px",
          boxShadow: 24,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography
          id="add-habit-modal"
          variant="h6"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          Add New Habit
        </Typography>

        <TextField
          label="Habit Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />

        <TextField
          label="Goal (days)"
          type="number"
          value={goal}
          onChange={(e) => setGoal(Number(e.target.value))}
          fullWidth
        />
        <Box sx={{ display: "flex", justifyContent: "center", gap: 6 }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              transition: "0.2s",
              "&:hover": {
                backgroundColor: "#DBF3FF",
              },
            }}
          >
            Add
          </Button>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              color: "#576574",
              borderColor: "#576574",
              transition: "0.2s",
              "&:hover": { backgroundColor: "#DBF3FF" }, // Kolor ikony po najechaniu
            }}
          >
            Anuluj
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddHabitModal;
