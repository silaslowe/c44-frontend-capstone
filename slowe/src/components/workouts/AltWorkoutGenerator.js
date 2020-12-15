import React, { useContext, useEffect, useState } from "react"
import { WorkoutContext } from "./WorkoutProvider"

export const AltWorkoutGenerator = (props) => {
  const { addWorkout } = useContext(WorkoutContext)
  console.log(props)

  // useEffect(() => {
  //   getWorkouts()
  // }, [])

  // useEffect(() => {
  //   generator()
  // }, [])

  const generator = () => {
    // filters the workouts by the current races
    const startDate = props.currentRace.startDate
    const raceDate = props.currentRace.date
    // determines the days between the the start of training and the race date
    const daysBetween = Math.ceil((raceDate - startDate) / (24 * 60 * 60 * 1000))
    console.log(daysBetween)
    let workoutArray = []
    // if the amount of filtered workouts is less than days between, which is the needed amount, the for loop gernerates a workout card for each day of training and pushed it into the workoutARray.
    for (let i = 0; i < daysBetween; i++) {
      workoutArray.push({
        raceId: props.currentRace.id,
        distanceGoal: "",
        timeGoal: "",
        speedGoal: "",
        workoutDist: "",
        workoutTime: "",
        workoutSpeed: "",
        notes: "",
        userId: parseInt(localStorage.getItem("app_user_id")),
      })
    }
    workoutArray.map((workout) => addWorkout(workout))
    props.history.push("/")
  }

  return (
    <>
      <button
        onClick={() => {
          generator()
        }}
      >
        GenerateWorkouts
      </button>
    </>
  )
}
