import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import initialState from "../redux/initialState.jsx";

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
  async ({ id, progress, isCompletedToday, completedDates }) => {
    const today = new Date().toISOString().split("T")[0];

    const updatedDates = isCompletedToday
      ? [...(completedDates || []), today]
      : completedDates.filter((date) => date !== today);

    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        progress,
        lastCompletedDate: progress > 0 ? today : null, // Jeśli progress > 0, aktualizujemy datę
        isCompletedToday,
        completedDates: updatedDates,
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
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload; // zapisujemy tekst wyszukiwania
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
          completedDates: habit.completedDates || [],
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
        const index = state.data.findIndex(
          (habit) => habit.id === action.payload.id,
        );
        if (index !== -1) {
          state.data[index] = {
            ...state.data[index],
            progress: action.payload.progress,
            isCompletedToday: action.payload.isCompletedToday,
            lastCompletedDate: action.payload.lastCompletedDate,
            completedDates: action.payload.completedDates,
          };
        }
      });
  },
});

export const { resetColor, setSearchQuery } = habitSlice.actions;

export default habitSlice.reducer;
