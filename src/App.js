import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import ScrollIntoView from "./components/Scrollintoview";

import LoginScreen from "./Login/LoginScreen";
import RegisterScreen from "./RegisterScreen";

import { Nav } from "./components/Nav";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import { Spinner } from "@chakra-ui/react";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute";
import Edituser from "./pages/Useredit/Edituser";
import AddData from "./pages/AddData";

const App = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="App">
      <header>
        <Router>
          {/* <ScrollIntoView> */}
          {loading ? (
            <div className="loading">
              <Spinner color="pink.500" />
            </div>
          ) : (
            <>
              <Nav />
              <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/register" component={RegisterScreen} />
                <Route exact path="/login" component={LoginScreen} />
                <Route exact path="/:id/update" component={Edituser} />
                <Route exact path="/adddata" component={AddData} />

                <ProtectedRoute exact path={"/Home"} component={Home} />
              </Switch>
            </>
          )}
          {/* </ScrollIntoView> */}
        </Router>
      </header>
    </div>
  );
};
export default App;
