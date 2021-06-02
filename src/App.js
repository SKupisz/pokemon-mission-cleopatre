import {BrowserRouter as Router, Route} from "react-router-dom";
import Menu from "./components/Menu.jsx";
import About from "./components/About.jsx";
import Help from "./components/Help.jsx";

import "./css/main.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path = "/" component = {Menu}/>
        <Route exact path = "/about" component = {About}/>
        <Route exact path = "/help" component = {Help}/>
      </Router>
    </div>
  );
}

export default App;
