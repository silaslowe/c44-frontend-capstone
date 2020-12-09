import React, { useContext, useEffect } from "react"
import { Route } from "react-router-dom"
import { RacesProvider, RacesContext } from "./races/RacesProvider"
import { RaceForm } from "./races/RaceForm"
import { RaceDisplay } from "./mainpage/RaceDisplay"
import { WorkoutsDisplay } from "./workouts/WorkoutsDisplay"
import { WorkoutProvider } from "./workouts/WorkoutProvider"
import { WorkoutGenerator } from "./workouts/WorkoutGenerator"

export const ApplicationViews = (props) => {
  const { getSelectedRace, selectedRace } = useContext(RacesContext)

  useEffect(() => {
    getSelectedRace()
  }, [])

  // localStorage.setItem("current_race", selectedRace.id)
  // localStorage.setItem("current_race", "")
  console.log(localStorage)
  // if (!localStorage.getItem("current_race")) {
  //   return (
  //     <>
  //       <RacesProvider>
  //         <Route path="/form" render={(props) => <RaceForm {...props} />} />
  //       </RacesProvider>
  //     </>
  //   )
  // } else
  return (
    <>
      {/* <RacesProvider>
        <WorkoutProvider>
          <Route exact path="/" render={(props) => <RaceDisplay {...props} />} />
          {console.log("Working?", localStorage)}
          <Route exact path="/" render={(props) => <WorkoutsDisplay {...props} />} />
        </WorkoutProvider>
      </RacesProvider> */}
      {/* <Route exact path="/" render={(props) => <RaceForm {...props} />} /> */}
      <Route exact path="/" render={(props) => <WorkoutGenerator {...props} />} />
    </>
  )
}
