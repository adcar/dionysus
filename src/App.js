import React from "react";
import "./App.css";
import teal from "material-ui/colors/teal";
import Reboot from "material-ui/Reboot";
import { createMuiTheme, MuiThemeProvider } from "material-ui/styles";
import Navbar from "./components/Navbar";
import SearchResults from "./components/SearchResults";
import { BrowserRouter as Router, Route } from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: teal
  }
});

const App = props => (
  <Router>
    <MuiThemeProvider theme={theme}>
      <Reboot />
      <Navbar />
      <Route path="/search/:term" component={SearchResults} />
    </MuiThemeProvider>
  </Router>
);

export default App;
