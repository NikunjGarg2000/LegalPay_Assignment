import { Route } from "react-router-dom";
import "./App.css";
import BankAccount from "./Pages/BankAccount";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <div className="App">
      <Route path="/" component={HomePage} exact />
      <Route path="/bankAccount" component={BankAccount} />
    </div>
  );
}

export default App;
