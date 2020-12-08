import React from "react"
import { Route, Redirect } from "react-router-dom"
// import { ApplicationViews } from "./ApplicationViews"
// import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { ApplicationViews } from "./ApplicationView"

console.log(localStorage.app_user_id)
// localStorage.setItem("app_user_id", "")
export const Slowe = (props) => (
  <>
    <Route
      render={() => {
        // The user id is saved under the key app_user_id in local Storage. Change below if needed!
        if (localStorage.getItem("app_user_id")) {
          return (
            <>
              <Route exact path="/" render={(props) => <ApplicationViews {...props} />} />
            </>
          )
        } else {
          return <Redirect to="/login" />
        }
      }}
    />

    <Route path="/login" render={(props) => <Login {...props} />} />
    <Route path="/register" render={(props) => <Register {...props} />} />
  </>
)
