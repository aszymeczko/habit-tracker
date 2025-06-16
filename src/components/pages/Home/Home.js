import SideBar from "../../views/SideBar/SideBar.js";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <>
      <SideBar />
      <Box
        sx={{
          mt: "80px",
          ml: "240px",
          flex: 1,
          backgroundColor: "#fff",
          padding: "16px",
        }}
      >
        Home
      </Box>
    </>
  );
};

export default Home;
