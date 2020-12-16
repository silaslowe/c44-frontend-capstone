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
    const day = 86400000
    let startingDate = startDate
    // determines the days between the the start of training and the race date
    const daysBetween = Math.ceil((raceDate - startDate) / (24 * 60 * 60 * 1000))
    console.log(daysBetween)
    let workoutArray = []
    // if the amount of filtered workouts is less than days between, which is the needed amount, the for loop gernerates a workout card for each day of training and pushed it into the workoutARray.
    for (let i = 0; i < daysBetween; i++) {
      startingDate += day
      workoutArray.push({
        raceId: props.currentRace.id,
        distanceGoal: props.currentRace.distance,
        timeGoal: props.currentRace.goalRaceTime,
        workoutDist: 0,
        workoutTime: 0,
        notes: "",
        userId: parseInt(localStorage.getItem("app_user_id")),
        date: startingDate,
        isComplete: false,
      })
    }
    return Promise.all(
      workoutArray.map((workout, i) => setTimeout(() => addWorkout(workout), i * 250))
    ).then(() => props.history.push("/"))
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
