import { Route } from "react-router-dom";
import {
  BrowserRouter,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import Index from "./Pages/Index.js";
import { Auth } from "./Pages/Dashboard_Pages/Auth/Auth";
import { Dashboard } from "./Pages/Dashboard_Pages/Dashboard";
// import { Customer } from "./Pages/Customer_Pages/Customer";
// import Loader from "./Components/Dashboard/Loader/Loader";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/auth" component={Auth} />
            <Route path="/admin/dashboard" component={Dashboard} />
            {/* <Route path="/customer" component={Customer} /> */}
          </Switch>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
