import React, { useContext, useEffect, useState } from "react"
import { RacesContext, RacesProvider } from "../races/RacesProvider"
import { Route, Redirect } from "react-router-dom"
import { WorkoutProvider, WorkoutContext } from "../workouts/WorkoutProvider"
import { RaceDisplay } from "../races/SetParameters"
import { WorkoutGenerator } from "../workouts/WorkoutGenerator"
import { RaceForm } from "../races/RaceForm"

export const AltHome = (props) => {
  const { getRaces, races } = useContext(RacesContext)
  const { getWorkoutsByRace, workouts } = useContext(WorkoutContext)
  const [selectedRace, setSelectedRace] = useState({})
  const [currentWorkouts, setCurrentWorkouts] = useState([])
  const currentUser = parseInt(localStorage.getItem("app_user_id"))

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

  console.log(selectedRace)
  console.log(races)

  useEffect(() => {
    getWorkoutsByRace(selectedRace.id).then(() => {
      setCurrentWorkouts(workouts)
    })
  }, [])
  // const currentRaceFinder = () => {
  //   const racesForUser = races.filter((race) => race.userId === currentUser)
  //   const raceStartDate = racesForUser.map((race) => race.startDate)
  //   const newestRace = Math.max(...raceStartDate)
  //   const currentRace = racesForUser.find((race) => race.startDate === newestRace)
  //   return currentRace
  // }
  return (
    <>
      <button onClick={() => props.history.push("/raceform")}>Form</button>
      <button
        onClick={() => {
          localStorage.setItem("current_race", selectedRace.id)
          if (workouts.length === 0) {
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
      </button>
    </>
  )
}

// To add later
// .find((race) => !race.isComplete) || {}
