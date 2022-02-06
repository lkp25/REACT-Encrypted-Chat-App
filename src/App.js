import "./App.css";
import Notes from "./pages/Notes";
import CreateNote from "./pages/CreateNote";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import { makeStyles } from "@mui/styles";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fab",
    },
    secondary: purple,
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightBold: 700,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

const useStyles = makeStyles({
  btn: {
    backgroundColor: "green",
    fontSize: 60,
    "&:hover": {
      color: "blue",
      backgroundColor: "green",
    },
    color: "white",
  },
  title: {
    textDecoration: "underline",
  },
  field: {
    margin: "20px",
    display: "block",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Notes />}></Route>
            <Route path="/create" element={<CreateNote />}></Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
