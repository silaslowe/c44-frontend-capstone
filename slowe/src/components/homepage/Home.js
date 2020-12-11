import React, { useContext, useEffect, useState } from "react"
import { RacesContext, RacesProvider } from "../races/RacesProvider"
import { Route, Redirect } from "react-router-dom"
import { NavBar } from "../nav/Nav"
import { WorkoutProvider } from "../workouts/WorkoutProvider"
import { RaceDisplay } from "../races/RaceDisplay"
import { WorkoutGenerator } from "../workouts/WorkoutGenerator"

export const Home = (props) => {
  const { getRaces, races } = useContext(RacesContext)
  const currentUser = parseInt(localStorage.getItem("app_user_id"))
  const [selectedRace, setSelectedRace] = useState({})

  useEffect(() => {
    getRaces()
  }, [])

  const currentRace = () => {
    const racesForUser = races.filter((race) => race.userId === currentUser)
    const currentRace = racesForUser.find((race) => !race.isComplete)
    return currentRace
  }
  useEffect(() => {
    setSelectedRace(currentRace())
  }, [])

  console.log(selectedRace)
  // get all. filter by user, find race with completed as false. If no race>>>start new race, if yes>>>show race

  return (
    <Route
      render={(props) => {
        // The user id is saved under the key app_user_id in local Storage. Change below if needed!
        if (selectedRace) {
          return (
            <>
              <RacesProvider>
                <WorkoutProvider>
                  <>
                    <Route
                      exact
                      path="/workout"
                      render={(props) => (
                        <>
                          <RaceDisplay {...props} />
                          <WorkoutGenerator {...props} />
                        </>
                      )}
                    />
                  </>
                </WorkoutProvider>
              </RacesProvider>
            </>
          )
        } else {
          return <Redirect to="/raceform" />
        }
      }}
    />
  )
}
