import React from "react"
import { Route } from "react-router-dom"
import { RacesProvider, RacesContext } from "./races/RacesProvider"
import { RaceForm } from "./races/RaceForm"
import { RaceDisplay } from "./mainpage/RaceDisplay"
import { WorkoutsDisplay } from "./workouts/WorkoutsDisplay"
import { WorkoutProvider, WorkoutsProvider } from "./workouts/WorkoutProvider"

export const ApplicationViews = (props) => {
  return (
    <>
      <RacesProvider>
        <WorkoutProvider>
          <Route path="/" render={(props) => <RaceDisplay {...props} />} />
          <Route path="/" render={(props) => <WorkoutsDisplay {...props} />} />
        </WorkoutProvider>
      </RacesProvider>
    </>
  )
}

{
  /* <Route exact path="/" render={(props) => <RaceForm {...props} />} /> */
}
