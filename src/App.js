import React, {useEffect} from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import Header from "./components/header";
import routes from "./Routes/routes";
import Home from "./pages/home";
import SignUp from "./pages/signUp";

import "./styles.css";
import Checkout from "./pages/checkout";
import Cart from "./pages/cart";
import Login from "./pages/login";
import Profile from "./pages/userProfile";

export default function App() {

  const location = useLocation();
  const history = useHistory();


  useEffect(() => {
    if (location.pathname === "/"){
      history.push(routes.home);
    }
  })

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path={routes.home} component={Home}></Route>
        <Route path={routes.signUp} component={SignUp}></Route>
        <Route path={routes.cart} component={Cart}></Route>
        <Route path={routes.checkout} component={Checkout}></Route>
        <Route path={routes.login} component={Login}></Route>
        <Route path={routes.userProfile} component={Profile}></Route>
      </Switch>
    </div>
  );
}
