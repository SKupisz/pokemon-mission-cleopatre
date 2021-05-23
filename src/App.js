import {BrowserRouter as Router, Route} from "react-router-dom";
import Main from "./components/Main.jsx";
import Menu from "./components/Menu.jsx";
import About from "./components/About.jsx";

import "./css/main.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path = "/" component = {Menu}/>
        <Route exact path = "/about" component = {About}/>
      </Router>
    </div>
  );
}

export default App;
