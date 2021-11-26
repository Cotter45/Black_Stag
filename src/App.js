import { Switch, Route } from "react-router-dom";


import NavBar from "./components/navigation/navbar";
import Home from "./components/main/home/home";
import Services from "./components/main/services/services";
import Contact from "./components/main/contact/contact";



function App() {
  return (
    <div className="app">
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route path="/about" component={About} /> */}
        <Route path="/services" component={Services} />
        <Route path="/contact" component={Contact} />
      </Switch>
    </div>
  );
}

export default App;
