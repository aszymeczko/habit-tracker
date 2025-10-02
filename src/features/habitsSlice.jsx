import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import initialState from "../redux/initialState.jsx";
import { decreaseColorIndex } from "../utils/utils.jsx";

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

    // 1. Logika: Dodajemy lub usuwamy datę
    let newCompletedDates;
    if (isCompletedToday) {
      // Jeśli oznaczamy jako ukończone: dodaj dzisiejszą datę, ale tylko jeśli jej nie ma
      const currentDates = completedDates || [];
      if (!currentDates.includes(today)) {
        newCompletedDates = [...currentDates, today];
      } else {
        newCompletedDates = currentDates;
      }
    } else {
      // Jeśli odznaczamy: usuń dzisiejszą datę
      newCompletedDates = (completedDates || []).filter(
        (date) => date !== today,
      );
    }

    // 2. Ustalenie nowej lastCompletedDate
    // Sortowanie gwarantuje, że ostatni element to najnowsza data
    const sortedDates = newCompletedDates.sort();
    const lastCompletedDate =
      sortedDates.length > 0 ? sortedDates[sortedDates.length - 1] : null;

    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        progress,
        lastCompletedDate,
        isCompletedToday, // Wysłanie aktualnego stanu do serwera (opcjonalnie)
        completedDates: newCompletedDates,
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
        decreaseColorIndex();
      })
      // Aktualizacja nawyku
      // Aktualizacja nawyku
      .addCase(updateHabitProgress.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (habit) => habit.id === action.payload.id,
        );
        if (index !== -1) {
          // Użyj rozpakowania (spread) do zaktualizowania habitu
          state.data[index] = {
            ...state.data[index],
            ...action.payload, // Wczytaj wszystkie zaktualizowane pola z API
            // Ponieważ action.payload zawiera: progress, isCompletedToday, lastCompletedDate, completedDates
          };
        }
      });
  },
});

export const { resetColor, setSearchQuery } = habitSlice.actions;

export default habitSlice.reducer;
