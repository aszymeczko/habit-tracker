import { Drawer } from "@mui/material";

const drawerWidth = 240;

const SideBar = () => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        zIndex: 5, // Niższy niż stopka
        position: "absolute",
        top: 0,
        left: 0,
        height: "100vh", // Pełna wysokość
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          marginTop: "80px",
          backgroundColor: "#A9746E",
        },
      }}
    >
      Side Bar
    </Drawer>
  );
};

export default SideBar;
