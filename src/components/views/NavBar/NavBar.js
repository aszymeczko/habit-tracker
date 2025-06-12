import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

const NavBar = () => {
  return (
    <AppBar
      position="static"
      sx={{
        height: 80,
      }}
    >
      <Box
        sx={{ display: "flex", alignItems: "center", ml: 5, height: "100%" }}
      >
        <IconButton>
          <Box
            className="material-symbols-outlined"
            sx={{
              fontSize: 50,
              color: "#fff", // Domyślny kolor
              transition: "color 0.2s", // Płynne przejście koloru i obwódki
              "&:hover": {
                color: "#ff7675", // Kolor ikony po najechaniu
              },
            }}
          >
            wand_stars
          </Box>
        </IconButton>

        <Typography variant="h4" sx={{ flexGrow: 1, ml: 3 }}>
          <Box
            component={NavLink}
            to="/"
            sx={{
              textDecoration: "none", // Brak dekoracji tekstu
              color: "#fff", // Domyślny kolor
              fontSize: 40,
              transition: "color 0.2s, border 0.2s", // Płynne przejście na hover
              "&:hover": {
                color: "#ff7675", // Kolor tekstu po najechaniu
              },
            }}
          >
            Habit Tracker
          </Box>
        </Typography>

        <TextField
          variant="outlined"
          size="small"
          placeholder="Search..."
          sx={{
            pr: 3, // Padding na prawo
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#fab1a0", // Kolor tła
              color: "#fff", // Kolor tekstu
              "& fieldset": {
                borderColor: "#fff", // Kolor obwódki
              },
              "&:hover fieldset": {
                borderColor: "#ff7675", // Kolor obwódki podczas najechania
              },
              "&.Mui-focused fieldset": {
                borderColor: "#ff7675", // Kolor obwódki po kliknięciu
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#fff" }} /> {/* Kolor ikony */}
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </AppBar>
  );
};

export default NavBar;
