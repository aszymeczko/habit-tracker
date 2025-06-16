import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f5f5f5",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1301, // Wyższy niż Drawer (default to 1200)
      }}
    >
      <Typography variant="body2" color="textSecondary">
        Stworzone z myślą o Tobie · Dziękujemy za zaufanie!
      </Typography>
    </Box>
  );
};

export default Footer;
