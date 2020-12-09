import React from "react"
import { Route, Redirect } from "react-router-dom"
// import { ApplicationViews } from "./ApplicationViews"
// import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { ApplicationViews } from "./ApplicationView"
import { RaceForm } from "./races/RaceForm"
import { RacesProvider, RacesContext } from "./races/RacesProvider"

// localStorage.setItem("app_user_id", "")
console.log(localStorage)

export const Slowe = (props) => (
  <>
    <Route
      render={() => {
        // The user id is saved under the key app_user_id in local Storage. Change below if needed!
        if (localStorage.getItem("app_user_id")) {
          return (
            <>
              <RacesProvider>
                <ApplicationViews />
              </RacesProvider>
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
