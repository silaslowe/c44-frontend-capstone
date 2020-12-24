import React from "react"
import { Route, Redirect } from "react-router-dom"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { ApplicationViews } from "./ApplicationView"
import { NavBar } from "./nav/Nav"
import { SloweFooter } from "../components/footer/Footer"

export const Slowe = (props) => (
  <>
    <Route
      render={(props) => {
        // The user id is saved under the key app_user_id in local Storage. Change below if needed!
        if (localStorage.getItem("app_user_id")) {
          return (
            <>
              <NavBar {...props} />
              <Route path="/" render={(props) => <ApplicationViews {...props} />} />
              <SloweFooter {...props} />
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
