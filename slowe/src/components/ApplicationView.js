import React, { useContext, useEffect } from "react"
import { Route, Redirect, Switch } from "react-router-dom"
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

  localStorage.setItem("current_race", selectedRace.id)

  return (
    <>
      <RacesProvider>
        <Route
          exact
          path="/raceform"
          render={(props) => {
            console.log("form", props)
            return <RaceForm {...props} />
          }}
        />
      </RacesProvider>

      <RacesProvider>
        <WorkoutProvider>
          <Route
            exact
            path="/"
            render={(props) => {
              console.log("gen", props)
              return <WorkoutGenerator {...props} />
            }}
          />
        </WorkoutProvider>
      </RacesProvider>
    </>
  )
}

/* <Route
render={() => {
  if (localStorage.getItem("current_race") !== "undefined") {
    return (
      <>
  
    )
  } else {
    return <Redirect to="/race-form" />
  }
}}
/> */

//  return (
//   <>
// <Route
// render={() => {
//   if (localStorage.getItem("current_race") !== "undefined") {
//     return (
//       <>
//        <RacesProvider>
//         <WorkoutProvider>
//           <Route exact path="/" render={(props) => <RaceDisplay {...props} />} />
//           <Route exact path="/" render={(props) => <WorkoutsDisplay {...props} />} />
//         </WorkoutProvider>
//       </RacesProvider>
//       </>
//     )
//   } else {
//     return <Redirect to="/race-form" />
//   }
// }}
// />

//   return (
//     <>
//       <RacesProvider>
//         <Route path="/" render={(props) => <RaceForm {...props} />} />
//       </RacesProvider>

//     </>
//   )
