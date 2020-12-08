import React from "react"
import { Route } from "react-router-dom"
import { RacesProvider } from "./races/RacesProvider"
import { RaceForm } from "./mainpage/RaceForm"

export const ApplicationViews = (props) => {
  return (
    <>
      <RacesProvider>
        <Route exact path="/" render={(props) => <RaceForm {...props} />} />
      </RacesProvider>
    </>
  )
}
