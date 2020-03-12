//어떤 라우터들을 보여줄지 다루는 Component
import PropTypes from "prop-types";
import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed";
import Explore from "../Routes/Explore";
import Search from "../Routes/Search";
import Profile from "../Routes/Profile";

const LoggedInRoutes = () => (
  //<Switch></Switch>는 여러 라우트중 하나의 라우트만 렌더링 하게 해준다.
  <Switch>
    <Route exact path="/" component={Feed}/>
    <Route path="/explore" component={Explore} />
    <Route path="/search" component={Search} />
    <Route path="/:username" component={Profile} />   
  </Switch>

);
const LoggedOutRoutes = () => (
  <Switch>
    <><Route exact path="/" component={Auth}></Route></>
  </Switch>
);
const AppRouter = ({isLoggedIn}) =>(
  isLoggedIn ? <LoggedInRoutes/> : <LoggedOutRoutes/>
);

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}
export default AppRouter;