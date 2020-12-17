import React, { useContext, useEffect, useState } from "react"
import { RacesContext, RacesProvider } from "../races/RacesProvider"
import { RaceInfo } from "../races/RaceInfo"
import { AltWorkoutGenerator } from "../workouts/AltWorkoutGenerator"
import { RaceForm } from "../races/RaceForm"
import { WorkoutContext } from "../workouts/WorkoutProvider"
import { WorkoutList } from "../workouts/WorkoutList"

export const AltHome = (props) => {
  const { getRaces, races } = useContext(RacesContext)
  const { workouts, getWorkouts } = useContext(WorkoutContext)
  const [currentRace, setCurrentRace] = useState({})
  const [currentWorkouts, setCurrentWorkouts] = useState([])
  const [stateChange, setStateChange] = useState("")
  const currentUser = parseInt(localStorage.getItem("app_user_id"))

  console.log(props)

  useEffect(() => {
    getRaces()
  }, [])

  // useEffect(() => {
  //   getRaces()
  // }, [props.location.state.stateChange])

  // Finds the most recent race for the user and sets the selectedRace state to be passed in state during the navigation
  useEffect(() => {
    setCurrentRace(currentRaceFinder() || {})
  }, [races])

  useEffect(() => {
    getWorkouts()
  }, [currentRace])
  // This is supposed to get the workouts for the selected race to be passed in state during navigation. The logic works but the fetch rarely does.
  useEffect(() => {
    setCurrentWorkouts(workouts.filter((workout) => workout.raceId === currentRace.id))
  }, [currentRace])

  useEffect(() => {
    setCurrentWorkouts(workouts.filter((workout) => workout.raceId === currentRace.id))
  }, [])

  useEffect(() => {
    localStorage.setItem("current_race", currentRace.id)
  }, [currentRace])

  // console.log("races", races)
  // console.log("workouts", workouts)
  // console.log("selectedRace", currentRace)
  // console.log("currentWorkouts", currentWorkouts)

  // Probably overly complex logic to filter the users races to find the most recent
  const currentRaceFinder = () => {
    const racesForUser = races.filter((race) => race.userId === currentUser)
    const raceStartDate = racesForUser.map((race) => race.startDate)
    const newestRace = Math.max(...raceStartDate)
    const currentRace = racesForUser.find((race) => race.startDate === newestRace)

    return currentRace
  }
  console.log(currentRace.id, currentWorkouts.length)

  return (
    <>
      {currentRace.id && currentWorkouts.length !== 0 ? (
        <>
          <RaceInfo {...props} currentRace={currentRace} currentWorkouts={currentWorkouts} />
          <WorkoutList {...props} currentRace={currentRace} currentWorkouts={currentWorkouts} />
        </>
      ) : currentRace.id ? (
        <>
          <RaceInfo {...props} currentRace={currentRace} currentWorkouts={currentWorkouts} />
          <AltWorkoutGenerator
            {...props}
            currentRace={currentRace}
            currentWorkouts={currentWorkouts}
          />
        </>
      ) : (
        <RaceForm {...props} />
      )}
    </>
  )
}

/* <button onClick={() => props.history.push("/raceform")}>Form</button>
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
      </button>
    </>
  )
} */
