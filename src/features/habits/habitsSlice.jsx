import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import initialState from "../../redux/initialState.jsx";

// URL API
const API_URL = "http://localhost:5001/habits";

// Pobieranie nawyków
export const fetchHabits = createAsyncThunk("habit/fetchHabits", async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
});

// Dodawanie nawyku
export const createHabit = createAsyncThunk(
  "habit/createHabit",
  async (newHabit) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newHabit),
    });
    const data = await response.json();
    return data;
  },
);

// Usuwanie nawyku
export const deleteHabit = createAsyncThunk("habit/deleteHabit", async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return id;
});

// Aktualizacja postępu nawyku
export const updateHabitProgress = createAsyncThunk(
  "habit/updateHabitProgress",
  async ({ id, progress, isCompletedToday }) => {
    const today = new Date().toISOString().split("T")[0];

    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        progress,
        lastCompletedDate: progress > 0 ? today : null, // Jeśli progress > 0, aktualizujemy datę
        isCompletedToday, // Przekazanie flagi
      }),
    });

    const data = await response.json();
    return data;
  },
);

const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {
    resetColor: (state) => {
      state.data.forEach((habit) => {
        habit.isCompletedToday = false;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      // Pobieranie nawyków
      .addCase(fetchHabits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        const today = new Date().toISOString().split("T")[0];

        state.loading = false;
        state.data = action.payload.map((habit) => ({
          ...habit,
          isCompletedToday: habit.lastCompletedDate === today,
        }));
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Dodawanie nawyku
      .addCase(createHabit.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      // Usuwanie nawyku
      .addCase(deleteHabit.fulfilled, (state, action) => {
        state.data = state.data.filter((habit) => habit.id !== action.payload);
      })
      // Aktualizacja nawyku
      .addCase(updateHabitProgress.fulfilled, (state, action) => {
        const today = new Date().toISOString().split("T")[0];

        const index = state.data.findIndex(
          (habit) => habit.id === action.payload.id,
        );
        if (index !== -1) {
          const newProgress = action.payload.progress;

          state.data[index] = {
            ...state.data[index],
            progress: newProgress,
            isCompletedToday:
              newProgress > 0 && action.payload.lastCompletedDate === today, // Aktualizacja koloru
            lastCompletedDate: action.payload.lastCompletedDate, // Ustaw dzisiejszą datę
          };
        }
      });
  },
});

export const { resetColor } = habitSlice.actions;

export default habitSlice.reducer;
