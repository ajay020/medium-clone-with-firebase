import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const OurStory = () => {
  return (
    <Box>
      <Typography variant="h1" sx={{ textAlign: "center", padding: "12px" }}>
        Every idea needs a{" "}
        <Typography variant="span" sx={{ fontstyle: "bold" }}>
          Medium.
        </Typography>
      </Typography>
    </Box>
  );
};

export default OurStory;
