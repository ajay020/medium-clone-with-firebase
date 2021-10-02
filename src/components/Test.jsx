import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { CssBaseline } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

import { makeStyles } from "@mui/styles";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles({
  main: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "no-wrap",
  },
  one: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "orange",
    flexGrow: "1",
    // height: "100vh",
    // position: "fixed",
    // top: "50%",
    // left: "10%",
    // padding: "12px",
    // overflow: "hidden",
    // zindex: "100",
  },
  two: {
    display: "flex",
    background: "blue",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    // height: "40vh",
    margin: "2px 0",
    flexGrow: "2",

    // overflowY: "scroll",
  },
  three: {},
});

const Test = () => {
  const classes = useStyles();
  return (
    <Box className={classes.main}>
      <Box variant="div" className={classes.one}>
        one
      </Box>
      <Box className={classes.two}>
        <Box>
          <Typography>One</Typography>
          <Typography>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur
            aliquam ratione incidunt fuga quae dolorem, delectus eligendi
            impedit ad temporibus illo nisi nemo vero repellat quo suscipit
            fugit! Excepturi, earum.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Test;
