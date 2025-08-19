import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 240;

const SideBar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const listItemBaseStyle = {
    textAlign: "center",
    borderRadius: "50px",
    fontWeight: "bold",
    marginBottom: "10px",
  };

  const typographyBaseStyle = {
    fontSize: { xs: "18px", md: "20px" },
    color: "#000",
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          marginTop: "80px",
          backgroundColor: "#A2D2FF",
        },
      }}
    >
      <List sx={{ margin: "10px 20px" }}>
        <ListItem
          component={Link}
          to="/"
          sx={{
            ...listItemBaseStyle,
            backgroundColor: isActive("/") ? "#C8B6FF" : "",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "#D5CFFF",
            },
          }}
        >
          <ListItemText
            primary="Home"
            sx={{
              "& .MuiTypography-root": { ...typographyBaseStyle },
            }}
          />
        </ListItem>
        <ListItem
          component={Link}
          to="/habits"
          sx={{
            ...listItemBaseStyle,
            backgroundColor: isActive("/habits") ? "#C8B6FF" : "",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "#D5CFFF",
            },
          }}
        >
          <ListItemText
            primary="Habits"
            sx={{
              "& .MuiTypography-root": { ...typographyBaseStyle },
            }}
          />
        </ListItem>
        <ListItem
          component={Link}
          to="/calendar"
          sx={{
            ...listItemBaseStyle,
            backgroundColor: isActive("/calendar") ? "#C8B6FF" : "",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "#D5CFFF",
            },
          }}
        >
          <ListItemText
            primary="Calendar"
            sx={{
              "& .MuiTypography-root": { ...typographyBaseStyle },
            }}
          />
        </ListItem>
        <ListItem
          component={Link}
          to="/statistics"
          sx={{
            ...listItemBaseStyle,
            backgroundColor: isActive("/statistics") ? "#C8B6FF" : "",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "#D5CFFF",
            },
          }}
        >
          <ListItemText
            primary="Statistics"
            sx={{
              "& .MuiTypography-root": { ...typographyBaseStyle },
            }}
          />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideBar;
