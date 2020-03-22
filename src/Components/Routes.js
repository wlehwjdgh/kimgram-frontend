//어떤 라우터들을 보여줄지 다루는 Component
import PropTypes from "prop-types";
import React from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed";
import Explore from "../Routes/Explore";
import Search from "../Routes/Search";
import Profile from "../Routes/Profile";

const LoggedInRoutes = () => (
  //<Switch></Switch>는 여러 라우트중 하나의 라우트만 렌더링 하게 해준다.
  //Redirect 는 위에 라우트중 동작하는 라우트가 없다면 즉 잘못된 주소 입력되면 홈으로 리다이렉트 시켜주는 용도이다. 
  <Switch>
    <Route exact path="/" component={Feed}/>
    <Route path="/explore" component={Explore} />
    <Route path="/search" component={Search} />
    <Route path="/:username" component={Profile} />   
    <Redirect from="*" to="/"/>
  </Switch>

);
const LoggedOutRoutes = () => (
  <Switch>
    <><Route exact path="/" component={Auth}></Route></>  
    <Redirect from="*" to="/"/>
  </Switch>
);
const AppRouter = ({isLoggedIn}) =>(
  isLoggedIn ? <LoggedInRoutes/> : <LoggedOutRoutes/>
);

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}
export default AppRouter;