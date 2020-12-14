import React, { useContext, useEffect, useState } from "react"
import { RacesContext, RacesProvider } from "../races/RacesProvider"

import { WorkoutProvider, WorkoutContext } from "../workouts/WorkoutProvider"

export const AltHome = (props) => {
  const { getRaces, races } = useContext(RacesContext)
  const { getWorkoutsByRace, workouts, getWorkouts } = useContext(WorkoutContext)
  const [selectedRace, setSelectedRace] = useState({})
  const [currentWorkouts, setCurrentWorkouts] = useState([])
  const currentUser = parseInt(localStorage.getItem("app_user_id"))

  useEffect(() => {
    getRaces()
  }, [])

  useEffect(() => {
    getWorkouts()
  }, [])

  // Finds the most recent race for the user and sets the selectedRace state to be passed in state during the navigation
  useEffect(() => {
    setSelectedRace(currentRaceFinder())
  }, [])

  // This is supposed to get the workouts for the selected race to be passed in state during navigation. The logic works but the fetch rarely does.
  useEffect(() => {
    getWorkoutsByRace(selectedRace.id).then(() => {
      setCurrentWorkouts(workouts)
    })
  }, [])

  // const currentRace = () => {
  //   const racesForUser = races.filter((race) => race.userId === currentUser)
  //   const currentRace = racesForUser.find((race) => !race.isComplete) || {}
  //   return currentRace
  // }

  // Probably overly complex logic to filter the users races to find the most recent
  const currentRaceFinder = () => {
    const racesForUser = races.filter((race) => race.userId === currentUser)
    const raceStartDate = racesForUser.map((race) => race.startDate)
    const newestRace = Math.max(...raceStartDate)
    const currentRace = racesForUser.find((race) => race.startDate === newestRace)
    return currentRace
  }
  console.log(selectedRace)
  return (
    <>
      {/* <button onClick={() => props.history.push("/raceform")}>Form</button>
      <button
        onClick={() => {
          if (!props.currentRace && !props.currentWorkouts) {
            window.alert("Please create a race")
          } else if (props.currentRace && !props.currentWorkouts) {
            localStorage.setItem("current_race", selectedRace.id)
            props.history.push({
              pathname: "/parameters",
              state: { currentRace: selectedRace },
            })
          } else {
            props.history.push({
              pathname: "/workout-display",
              state: { currentRace: selectedRace },
            })
          }
        }}
      >
        Race
      </button> */}
    </>
  )
}

// To add later
// .find((race) => !race.isComplete) || {}
