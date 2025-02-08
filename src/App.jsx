import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Authentication from "./components/Authentication";
import DashBoard from "./components/DashBoard";
function App() {
  return (
    <>
      <Router>
        <DashBoard />
      </Router>
    </>
  );
}

export default App;
