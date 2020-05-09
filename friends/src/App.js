import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/login";
import PrivateRoute from "./components/privateroute";
import Friends from "./components/friends";

function Greetings() {
  return <h2 className="welcome">Welcome to Auth Friends</h2>;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  return (
    <div className="App">
      <Router>
        <header>
          <div className="container">
            <Link className="brand-name" to="/">
              Auth Friends
            </Link>
            <ul className="nav-list">
              {isLoggedIn ? (
                <li>
                  <Link
                    onClick={() => {
                      localStorage.removeItem("token");
                      setIsLoggedIn(false);
                    }}
                    className="nav-link"
                    to="/"
                  >
                    Logout
                  </Link>
                </li>
              ) : (
                <li>
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              )}
              <li>
                <Link className="nav-link" to="/friends">
                  Friends
                </Link>
              </li>
            </ul>
          </div>
        </header>
        <Switch>
          <Route exact path="/" component={Greetings} />
          <Route
            path="/login"
            component={props => (
              <Login
                {...props}
                setIsLoading={setIsLoading}
                setIsLoggedIn={setIsLoggedIn}
              />
            )}
          />
          <PrivateRoute
            path="/friends"
            component={props => (
              <Friends
                {...props}
                setIsLoading={setIsLoading}
                isloading={isloading}
              />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
