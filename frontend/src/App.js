import React from "react";
import { Route, Switch } from "react-router-dom";
// import SignupFormPage from "./components/SignUpFormModal/SignUpForm";
import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";
import NewsFeed from "./components/NewsFeed";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import EditPosts from "./components/Posts/EditPosts";
import ProfilePage from "./components/ProfilePage/ProfilePage";

function App() {
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  if(!sessionUser) history.push('/');

  return (
    <>
      <Navigation />
        <Switch>
          <Route exact path="/login" >
            <LoginFormPage />
          </Route>
          {/* <Route exact path="/posts/:postId/edit" component={EditPosts} /> */}
          <Route path="/users/:userId" component={ProfilePage}/>
          <Route exact path="/">
            <NewsFeed />
          </Route>
          {/* <Route exact path="/">
            <SignupFormPage />
          </Route> */}
        </Switch>
    </>
  );
}

export default App;
