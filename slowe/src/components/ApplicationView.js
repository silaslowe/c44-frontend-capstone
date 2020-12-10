import React, { useContext, useEffect } from "react"
import { Route, Redirect } from "react-router-dom"
import { RacesProvider, RacesContext } from "./races/RacesProvider"
import { RaceForm } from "./races/RaceForm"
import { WorkoutProvider } from "./workouts/WorkoutProvider"
import { WorkoutGenerator } from "./workouts/WorkoutGenerator"

export const ApplicationViews = (props) => {
  const { getSelectedRace, selectedRace } = useContext(RacesContext)

  // Pulls the most recent race for the current user
  useEffect(() => {
    getSelectedRace()
  }, [])

  // Checks to see if the selectedRace comes back truthy and if so saves the raceId in localStorage
  if (selectedRace) {
    localStorage.setItem("current_race", selectedRace.id)
  }

  // If there is no race saved in localStorage then the user is directed to the race for page and if there is they are directed to their training page
  return (
    <>
      <Route
        render={() => {
          if (!localStorage.getItem("current_race")) {
            return (
              <>
                <RacesProvider>
                  <Route
                    exact
                    path="/raceform"
                    render={(props) => {
                      console.log("IN RP", localStorage)
                      return <RaceForm {...props} />
                    }}
                  />
                </RacesProvider>
              </>
            )
          } else {
            return <Redirect to="/" />
          }
        }}
      />
      <RacesProvider>
        <Route
          exact
          path="/raceform"
          render={(props) => {
            return <RaceForm {...props} />
          }}
        />
      </RacesProvider>
      <RacesProvider>
        <WorkoutProvider>
          <Route exact path="/" render={(props) => <WorkoutGenerator {...props} />} />
        </WorkoutProvider>
      </RacesProvider>
      )
    </>
  )
}
