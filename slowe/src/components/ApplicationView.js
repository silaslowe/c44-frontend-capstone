import React, { useContext, useEffect, useState } from "react"
import { Route } from "react-router-dom"
import { RacesProvider, RacesContext } from "./races/RacesProvider"
import { RaceForm } from "./races/RaceForm"
import { WorkoutProvider, WorkoutContext } from "./workouts/WorkoutProvider"
import { WorkoutGenerator } from "./workouts/WorkoutGenerator"
import { SetParameters } from "./races/SetParameters"
import { Parameters } from "./races/Parameters"
import { AltHome } from "./homepage/Alt-Home"
import { RaceInfo } from "./races/RaceInfo"
import { WorkoutsDisplay } from "./workouts/WorkoutsDisplay"

export const ApplicationViews = (props) => {
  const { getRaces, races } = useContext(RacesContext)
  const { getWorkouts, workouts, getWorkoutsByRace } = useContext(WorkoutContext)
  const currentUser = parseInt(localStorage.getItem("app_user_id"))
  const [currentWorkouts, setCurrentWorkouts] = useState([])
  const [selectedRace, setSelectedRace] = useState({})

  useEffect(() => {
    getRaces()
  }, [])

  // Finds the most recent race for the user and sets the selectedRace state to be passed in state during the navigation
  useEffect(() => {
    setSelectedRace(currentRaceFinder())
  }, [races])

  // This is supposed to get the workouts for the selected race to be passed in state during navigation. The logic works but the fetch rarely does.

  // Probably overly complex logic to filter the users races to find the most recent
  const currentRaceFinder = () => {
    const racesForUser = races.filter((race) => race.userId === currentUser)
    if (racesForUser) {
      const raceStartDate = racesForUser.map((race) => race.startDate)
      const newestRace = Math.max(...raceStartDate)
      const currentRace = racesForUser.find((race) => race.startDate === newestRace)
      return currentRace
    } else {
      setSelectedRace({})
    }
  }

  useEffect(() => {
    getWorkouts()
  }, [])

  useEffect(() => {
    setCurrentWorkouts(currentWorkoutsFinder())
  }, [workouts, selectedRace])

  const currentWorkoutsFinder = () => {
    if (selectedRace) {
      const currentWorkouts = workouts.filter((workout) => {
        return workout.raceId === selectedRace.id
      })
      return currentWorkouts
    } else {
      setCurrentWorkouts([])
    }
  }

  console.log(selectedRace, currentWorkouts)

  return (
    <>
      <RacesProvider>
        <WorkoutProvider>
          <Route
            exact
            path="/"
            render={(props) => (
              <AltHome {...props} currentRace={selectedRace} currentWorkouts={currentWorkouts} />
            )}
          />
        </WorkoutProvider>
      </RacesProvider>

      <RacesProvider>
        <WorkoutProvider>
          <Route
            path="/parameters"
            render={(props) => (
              <>
                <RaceInfo {...props} currentRace={selectedRace} currentWorkouts={currentWorkouts} />
                <SetParameters
                  {...props}
                  currentRace={selectedRace}
                  currentWorkouts={currentWorkouts}
                />
                <WorkoutGenerator
                  {...props}
                  currentRace={selectedRace}
                  currentWorkouts={currentWorkouts}
                />
                <WorkoutsDisplay
                  {...props}
                  currentRace={selectedRace}
                  currentWorkouts={currentWorkouts}
                />
              </>
            )}
          />
        </WorkoutProvider>
      </RacesProvider>
      {/*  */}
      <RacesProvider>
        <WorkoutProvider>
          <Route
            exact
            path="/workout-display"
            render={(props) => (
              <>
                <RaceInfo {...props} currentRace={selectedRace} currentWorkouts={currentWorkouts} />
                <Parameters
                  {...props}
                  currentRace={selectedRace}
                  currentWorkouts={currentWorkouts}
                />

                <WorkoutsDisplay
                  {...props}
                  currentRace={selectedRace}
                  currentWorkouts={currentWorkouts}
                />
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
