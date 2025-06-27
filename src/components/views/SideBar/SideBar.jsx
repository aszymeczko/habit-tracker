import { Drawer } from "@mui/material";

const drawerWidth = 240;

const SideBar = () => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
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
