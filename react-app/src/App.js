import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Route, Switch} from "react-router-dom";
import {authenticate} from "./store/session";
import Navigation from "./components/Navigation";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Signup from "./pages/signup/Signup";
import Debug from "./components/Debug";
import Navbar from "./components/navbar/Navbar";

function App() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (<>
    <Navbar sessionUser={sessionUser} isLoaded={isLoaded}/> {
    isLoaded && (<Switch>
      <Route path='/login'>
        <Login/>
      </Route>

      <Route path='/register'>
        <Signup/>
      </Route>

      <Route path='/debug'>
        <Debug />
      </Route>

      <Route path='/'>
        <Home/>
      </Route>
    </Switch>)
  } </>);
}

export default App;
