import React, { useContext, useEffect, useState } from "react"
import { WorkoutContext } from "./WorkoutProvider"

export const AltWorkoutGenerator = (props) => {
  const { addWorkout, getWorkouts, workouts } = useContext(WorkoutContext)
  const [generated, setGenerated] = useState(false)
  const [currentWorkouts, setCurrentWorkouts] = useState([])
  const [daysNeeded, setDaysNeeded] = useState()
  const [arrayLength, setArrayLength] = useState("")
  let daysBetween = ""
  let workoutArray = []

  console.log(props)

  useEffect(() => {
    getWorkouts()
  }, [])

  useEffect(() => {
    setCurrentWorkouts(workouts.filter((workout) => workout.raceId === props.currentRace.id))
  }, [workouts])

  const generator = () => {
    // filters the workouts by the current races
    const startDate = props.currentRace.startDate
    const raceDate = props.currentRace.date
    const day = 86400000
    let startingDate = startDate
    // determines the days between the the start of training and the race date
    daysBetween = Math.ceil((raceDate - startDate) / (24 * 60 * 60 * 1000))
    setDaysNeeded(daysBetween)
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
    const delay = workoutArray.length * 250 + 50
    console.log(delay)

    return Promise.all(
      workoutArray.map((workout, i) => setTimeout(() => addWorkout(workout), i * 250))
    ).then(() => {
      setTimeout(() => setGenerated(true), delay - 50)
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
