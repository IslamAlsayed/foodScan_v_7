import { Route } from "react-router-dom";
import "./App.css";
import {
  BrowserRouter,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";

import { Navbar } from "./Componenets/Customer/Navbar";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

import { Auth } from "./Pages/Dashboard_Pages/Auth/Auth";
import { Dashboard } from "./Pages/Dashboard_Pages/Dashboard";
import { Customer } from "./Pages/Customer_Pages/Customer";
// import Loader from "./Components/Dashboard/Loader/Loader";

function App() {
  return (
    <>
      <div className="App">
        {window.location.pathname == "" ? (
          <ul>
            <li key="0">
              <a href="/auth/login">login</a>
            </li>
            <li key="1">
              <a href="/admin/dashboard">dashboard</a>
            </li>
            <li key="2">
              <a href="/customer/menu">customer</a>
            </li>
          </ul>
        ) : (
          <></>
        )}

        {/* <Test/> */}
        <BrowserRouter>
          <Switch>
            <Route path="/auth" component={Auth} />
            <Route path="/admin/dashboard" component={Dashboard} />
            <Route path="/customer" component={Customer} />
          </Switch>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
