import Box from "@mui/material/Box";
import Navbar from "./navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <Box component="div">
      <Navbar />
      {children}
    </Box>
  );
};

export default Layout;
