import React from "react"
import { Route } from "react-router-dom"
import { RacesProvider, RacesContext } from "./races/RacesProvider"
import { RaceForm } from "./races/RaceForm"
import { RaceDisplay } from "./mainpage/RaceDisplay"

export const ApplicationViews = (props) => {
  return (
    <>
      <RacesProvider>
        <Route path="/" render={(props) => <RaceDisplay {...props} />} />
      </RacesProvider>
    </>
  )
}

{
  /* <Route exact path="/" render={(props) => <RaceForm {...props} />} /> */
}
