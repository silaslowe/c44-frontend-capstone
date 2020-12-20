import React, { useContext } from "react"
import { WorkoutContext } from "./WorkoutProvider"

export const WorkoutGenerator = (props) => {
  const { addWorkout } = useContext(WorkoutContext)

  // # of days between start of workouts and race
  let daysBetween = ""
  // holds generated workout objects
  let workoutArray = []

  const generator = () => {
    // filters the workouts by the current races
    const startDate = props.currentRace.startDate
    const raceDate = props.currentRace.date
    const day = 86400000
    let startingDate = startDate
    // determines the days between the the start of training and the race date
    daysBetween = Math.ceil((raceDate - startDate) / (24 * 60 * 60 * 1000))
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
        metGoal: false,
      })
    }
    // Total timeout time set by map
    const delay = workoutArray.length * 250 + 50
    console.log("workoutArray", workoutArray)
    console.log("delay", delay)

    // posts each workout to the db with a timeout to avoid logjam in json server
    return Promise.all(
      workoutArray.map((workout, i) => setTimeout(() => addWorkout(workout), i * 250))
    ).then(() => {
      setTimeout(
        () => props.history.push({ pathname: "/placehold", state: { stateChange: 1 } }),
        delay
      )
    })
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
