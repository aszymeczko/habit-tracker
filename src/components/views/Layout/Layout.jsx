import { Box } from "@mui/material";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";

const drawerWidth = 240;
const appBarHeight = 80;

const Layout = ({ children }) => {
  return (
    <Box>
      <Header />
      <Box
        component="main"
        sx={{
          mt: `${appBarHeight}px`,
          ml: `${drawerWidth}px`,
          flexGrow: 1,
          p: 2,
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
