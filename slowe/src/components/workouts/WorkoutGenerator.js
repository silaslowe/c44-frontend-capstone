import React, { useContext, useEffect, useState } from "react"
import { RacesContext } from "../races/RacesProvider"
import { WorkoutContext } from "./WorkoutProvider"
import { WorkoutsDisplay } from "./WorkoutsDisplay"

export const WorkoutGenerator = (props) => {
  const { addWorkout, workouts, editWorkout, getWorkoutsByRace } = useContext(WorkoutContext)
  const { races } = useContext(RacesContext)
  const currentUser = parseInt(localStorage.getItem("app_user_id"))
  const currentRace = props.location.state.currentRace
  let workoutLength = props.location.state.workoutLength
  // Waits for selectedRace to be assessed to the dates can be subtraced and the days between can be generated.
  let startDate = ""
  let raceDate = ""
  let workoutArray = []

  console.log("WOL WG", workoutLength)
  console.log("CR WG", currentRace)

  // gets workouts and filters them for this race and generates workout objects
  useEffect(() => {
    getWorkoutsByRace().then(generator())
  }, [races])

  const generator = () => {
    startDate = currentRace.startDate
    raceDate = currentRace.date
    const daysBetween = Math.ceil((raceDate - startDate) / (24 * 60 * 60 * 1000))
    console.log(workoutLength)
    if (workoutLength === 0) {
      for (let i = 0; i < daysBetween; i++) {
        workoutArray.push({
          raceId: currentRace.id,
          distanceGoal: currentRace.distance,
          timeGoal: currentRace.goalRaceTime,
          speedGoal: "",
          workoutDist: currentRace.distance,
          workoutTime: "",
          workoutSpeed: "",
          notes: "",
          userId: currentUser,
        })
      }
    }
    if (workoutLength < daysBetween) {
      workoutArray.map((workout) => addWorkout(workout))
    } else {
      workoutArray = [...workouts]
      workoutArray.map((workout) =>
        editWorkout({ userId: currentUser, timeGoal: currentRace.goalRaceTime, id: workout.id })
      )
    }
  }

  return (
    <>
      <WorkoutsDisplay {...props} currentRace={currentRace} />
      {/* <h1>Generating</h1> */}
    </>
  )
}
