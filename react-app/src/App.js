import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {Route, Switch} from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import {authenticate} from "./store/session";
import Navigation from "./components/Navigation";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Signup from "./pages/signup/Signup";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (<>
    <Navigation isLoaded={isLoaded}/> {
    isLoaded && (<Switch>
      <Route path='/login'>
        <Login/>
      </Route>

      <Route path='/register'>
        <Signup/>
      </Route>

      <Route path='/'>
        <Home/>
      </Route>
    </Switch>)
  } </>);
}

export default App;
