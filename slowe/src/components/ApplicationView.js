import React, { useContext, useEffect } from "react"
import { Route } from "react-router-dom"
import { RacesProvider, RacesContext } from "./races/RacesProvider"
import { RaceForm } from "./races/RaceForm"
import { RaceDisplay } from "./mainpage/RaceDisplay"
import { WorkoutsDisplay } from "./workouts/WorkoutsDisplay"
import { WorkoutProvider } from "./workouts/WorkoutProvider"

export const ApplicationViews = (props) => {
  const { getRaceSelected, selectedRace } = useContext(RacesContext)

  useEffect(() => {
    getRaceSelected()
  }, [])

  localStorage.setItem("current_race", selectedRace.id)
  console.log(localStorage)

  return (
    <>
      <RacesProvider>
        <WorkoutProvider>
          <Route exact path="/" render={(props) => <RaceDisplay {...props} />} />
          {console.log("Working?", localStorage)}
          <Route exact path="/" render={(props) => <WorkoutsDisplay {...props} />} />
        </WorkoutProvider>
      </RacesProvider>
    </>
  )
}

{
  /* <Route exact path="/" render={(props) => <RaceForm {...props} />} /> */
}
