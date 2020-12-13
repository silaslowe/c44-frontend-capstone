import React, { useContext, useEffect, useState } from "react"
import { RacesContext } from "../races/RacesProvider"
import { WorkoutContext } from "./WorkoutProvider"
import { WorkoutsDisplay } from "./WorkoutsDisplay"

export const WorkoutGenerator = (props) => {
  const { addWorkout, getWorkouts, workouts, setWorkouts, editWorkout } = useContext(WorkoutContext)
  const { races } = useContext(RacesContext)
  const currentUser = parseInt(localStorage.getItem("app_user_id"))
  const currentRace = props.location.state.currentRace
  const workoutLength = props.location.state.workoutLength
  console.log(props)
  // Waits for selectedRace to be assessed to the dates can be subtraced and the days between can be generated.
  let startDate = ""
  let raceDate = ""
  let workoutArray = []

  // gets workouts and filters them for this race and generates workout objects
  useEffect(() => {
    getWorkouts().then(filterWorkouts()).then(generator())
  }, [races])

  const filterWorkouts = () => {
    const selectedRaceWorkouts = workouts.filter((workout) => workout.raceId === currentRace.id)
    setWorkouts(selectedRaceWorkouts)
  }

  const generator = () => {
    startDate = currentRace.startDate
    raceDate = currentRace.date
    const daysBetween = Math.ceil((raceDate - startDate) / (24 * 60 * 60 * 1000))
    if (workoutLength > daysBetween) {
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
      console.log("WA", workoutArray)
      workoutArray.map((workout) => addWorkout(workout))
    } else {
      workoutArray = [...workouts]
      console.log("WA", workoutArray)
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
