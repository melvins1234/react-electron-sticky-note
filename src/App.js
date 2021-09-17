import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import Note from "./components/Note/Note";
import "./style.scss";
function App() {
  return (
    <>
      <Router>
        <Route
          exact
          path={["/"]}
          component={() => [<Header key="header" />, <Body key="body" />]}
        />
        <Route
          exact
          path={["/add-note"]}
          component={() => [<Note key="note" />]}
        />
      </Router>
    </>
  );
}

export default App;
