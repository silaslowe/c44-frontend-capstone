import React, { useContext, useEffect, useState } from "react"
import { WorkoutContext } from "./WorkoutProvider"

export const AltWorkoutGenerator = (props) => {
  const { addWorkout, workouts, getWorkouts } = useContext(WorkoutContext)

  useEffect(() => {
    getWorkouts()
  }, [])

  useEffect(() => {
    generator()
  }, [])

  const generator = () => {
    // filters the workouts by the current races
    const startDate = props.currentRace.startDate
    const raceDate = props.currentRace.date
    // determines the days between the the start of training and the race date
    const daysBetween = Math.ceil((raceDate - startDate) / (24 * 60 * 60 * 1000))

    // if the amount of filtered workouts is less than days between, which is the needed amount, the for loop gernerates a workout card for each day of training and pushed it into the workoutARray.
    for (let i = 0; i < daysBetween; i++) {
      console.log(i)
      addWorkout({
        raceId: props.currentRace.id,
        distanceGoal: props.currentRace.distance,
        timeGoal: props.currentRace.goalRaceTime,
        speedGoal: "",
        workoutDist: props.currentRace.distance,
        workoutTime: "",
        workoutSpeed: "",
        notes: "",
        userId: parseInt(localStorage.getItem("app_user_id")),
      })
    }
  }

  return (
    <>
      <h1>Generating for You</h1>
      {}
    </>
  )
}
