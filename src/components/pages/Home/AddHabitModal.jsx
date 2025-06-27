import { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { createHabit } from "../../../features/habits/habitsSlice.jsx";

const AddHabitModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [goal, setGoal] = useState(""); // Domyślny cel: 30 dni

  // const [frequency, setFrequency] = useState("daily"); // Codziennie
  // const [progress, setProgress] = useState(0); // Start bez postępu

  const handleSubmit = () => {
    if (name && goal > 0) {
      dispatch(
        createHabit({
          name,
          goal,
          progress: 0,
          lastCompletedDate: null, // lub pomiń to całkowicie
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

        {/*<TextField*/}
        {/*  select*/}
        {/*  label="Frequency"*/}
        {/*  value={frequency}*/}
        {/*  onChange={(e) => setFrequency(e.target.value)}*/}
        {/*  fullWidth*/}
        {/*>*/}
        {/*  <MenuItem value="daily">Daily</MenuItem>*/}
        {/*  <MenuItem value="every_other_day">Every Other Day</MenuItem>*/}
        {/*  <MenuItem value="twice-a-week">Twice a week</MenuItem>*/}
        {/*  <MenuItem value="weekly">Weekly</MenuItem>*/}
        {/*</TextField>*/}

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
                backgroundColor: "#9C7CA5",
                color: "#F6E2D3", // Kolor ikony po najechaniu
              },
            }}
          >
            Add
          </Button>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              color: "#9C7CA5",
              borderColor: "#9C7CA5",
              transition: "0.2s",
              "&:hover": { backgroundColor: "#e0e0e0", color: "" }, // Kolor ikony po najechaniu
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
