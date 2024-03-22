import Button from "./components/Button";
import React, {useEffect} from 'react';
import NotSignIn from "./pages/NotSignIn";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import { publicRoutes} from "../src/routers";

function App() {

  return (
      <Router>
          <div className="App">
              <Routes>
                  {publicRoutes.map((route,index) => {
                      const Page = route.component;
                      return (
                          <Route
                              key={index}
                              path={route.path}
                              element={<Page/>}
                          />
                      )
                  })}
              </Routes>
          </div>
      </Router>
  );
}

export default App;
