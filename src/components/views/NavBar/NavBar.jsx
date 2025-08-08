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
      position="fixed"
      sx={{
        height: 80,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Box
        sx={{ display: "flex", alignItems: "center", ml: 5, height: "100%" }}
      >
        <IconButton>
          <Box
            className="material-symbols-outlined"
            sx={{
              fontSize: 45,
              color: "#A2D2FF", // Domyślny kolor
              transition: "color 0.2s",
              "&:hover": {
                color: "#C8B6FF", // Kolor ikony po najechaniu
              },
            }}
          >
            wand_stars
          </Box>
        </IconButton>

        <Typography sx={{ flexGrow: 1 }}>
          <Box
            component={NavLink}
            to="/"
            sx={{
              textDecoration: "none",
              color: "#000",
              fontSize: 26,
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
            pr: 3,
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#FAE7EB", // Kolor tła
              color: "#000", // Kolor tekstu
              "& fieldset": {
                borderColor: "#A2D2FF",
                borderWidth: 1.5, // Kolor obwódki
              },
              "&:hover fieldset": {
                borderColor: "#C8B6FF", // Kolor obwódki podczas najechania
              },
              "&.Mui-focused fieldset": {
                borderColor: "#C8B6FF", // Kolor obwódki po kliknięciu
              },
              "&.Mui-focused .MuiSvgIcon-root": {
                color: "#C8B6FF", // kolor ikony po kliknięciu
              },
              "&:hover .MuiSvgIcon-root": {
                color: "#C8B6FF",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#A2D2FF" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </AppBar>
  );
};

export default NavBar;
