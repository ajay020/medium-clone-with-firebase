import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const BlackButton = ({ text }) => {
  return (
    <Button
      component={Link}
      to="/register"
      variant="contained"
      sx={{
        // color: (theme) => theme.palette.primary.main,
        // backgroundColor: (theme) => theme.palette.secondary.main,
        borderRadius: "20px",
        textTransform: "capitalize",
        "&:hover": {
          //   backgroundColor: "black",
        },
      }}
    >
      {text}
    </Button>
  );
};

export default BlackButton;
