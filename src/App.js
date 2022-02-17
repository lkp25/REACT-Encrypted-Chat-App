import "./App.css";
import Notes from "./pages/Notes";
import CreateNote from "./pages/CreateNote";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import { makeStyles } from "@mui/styles";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import Chat from "./pages/Chat";

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

const ws = new WebSocket("ws://127.0.0.1:9876/websocket");
ws.onopen = () => {
  ws.send("CLIENT INITIAL MSG");
};

ws.onmessage = (event) => {
  console.log(event.data);
};
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Notes />}></Route>
            <Route path="/create" element={<CreateNote />}></Route>
            <Route path="/chat" element={<Chat />}></Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
