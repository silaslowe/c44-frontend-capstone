import React, { useContext, useEffect, useState } from "react"
import { Route } from "react-router-dom"
import { RacesProvider, RacesContext } from "./races/RacesProvider"
import { RaceForm } from "./races/RaceForm"
import { WorkoutProvider } from "./workouts/WorkoutProvider"
import { WorkoutGenerator } from "./workouts/WorkoutGenerator"
import { SetParameters } from "./races/SetParameters"
import { Parameters } from "./races/Parameters"
import { AltHome } from "./homepage/Alt-Home"
import { RaceInfo } from "./races/RaceInfo"

export const ApplicationViews = (props) => {
  const { getRaces, races } = useContext(RacesContext)
  const currentUser = parseInt(localStorage.getItem("app_user_id"))
  const [selectedRace, setSelectedRace] = useState({})

  useEffect(() => {
    getRaces()
  }, [])

  const currentRace = () => {
    const racesForUser = races.filter((race) => race.userId === currentUser)
    const currentRace = racesForUser.find((race) => !race.isComplete) || {}
    return currentRace
  }
  useEffect(() => {
    setSelectedRace(currentRace())
  }, [races])

  // Pulls the most recent race for the current user
  // useEffect(() => {
  //   getSelectedRace()
  // }, [])

  // Checks to see if the selectedRace comes back truthy and if so saves the raceId in localStorage
  // if (selectedRace) {
  //   localStorage.setItem("current_race", selectedRace.id)
  // }
  return (
    <>
      <RacesProvider>
        <WorkoutProvider>
          <Route exact path="/" render={(props) => <AltHome {...props} />} />
        </WorkoutProvider>
      </RacesProvider>

      <RacesProvider>
        <WorkoutProvider>
          <Route
            path="/parameters"
            render={(props) => (
              <>
                <RaceInfo {...props} />
                <SetParameters {...props} />
              </>
            )}
          />
        </WorkoutProvider>
      </RacesProvider>

      <RacesProvider>
        <WorkoutProvider>
          <Route
            exact
            path="/workout-display"
            render={(props) => (
              <>
                <RaceInfo {...props} />
                <Parameters {...props} />
                <WorkoutGenerator {...props} />
              </>
            )}
          />
        </WorkoutProvider>
      </RacesProvider>

      <RacesProvider>
        <Route exact path="/raceform" render={(props) => <RaceForm {...props} />} />
      </RacesProvider>
    </>
  )
}

// If there is no race saved in localStorage then the user is directed to the race for page and if there is they are directed to their training page
//   return (
//     <>
//       <Route
//         render={() => {
//           if (localStorage.getItem("current_race") === "undefined") {
//             return (
//               <>
//                 <RacesProvider>
//                   <Route
//                     exact
//                     path="/raceform"
//                     render={(props) => {
//                       console.log("IN RP", localStorage)
//                       return <RaceForm {...props} />
//                     }}
//                   />
//                 </RacesProvider>
//               </>
//             )
//           } else {
//             return <Redirect to="/" />
//           }
//         }}
//       />
//       {/* <RacesProvider>
//         <Route
//           exact
//           path="/raceform"
//           render={(props) => {
//             return <RaceForm {...props} />
//           }}
//         />
//       </RacesProvider> */}
// <RacesProvider>
//   <WorkoutProvider>
//     <Route exact path="/" render={(props) => <WorkoutGenerator {...props} />} />
//   </WorkoutProvider>
// </RacesProvider>
//       )
//     </>
//   )
// }
