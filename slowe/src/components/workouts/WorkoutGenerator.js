import React, { useContext, useEffect } from "react"
import { RaceDisplay } from "../mainpage/RaceDisplay"
import { RacesContext } from "../races/RacesProvider"
import { Workout } from "./Workout"
import { WorkoutContext } from "./WorkoutProvider"
import { WorkoutsDisplay } from "./WorkoutsDisplay"

export const WorkoutGenerator = (props) => {
  const { getSelectedRace, selectedRace } = useContext(RacesContext)
  const { addWorkout, getWorkoutsByRace } = useContext(WorkoutContext)

  let startDate = selectedRace.startDate
  let raceDate = selectedRace.date

  useEffect(() => {
    getSelectedRace()
  }, [])

  const daysBetween = Math.ceil((raceDate - startDate) / (24 * 60 * 60 * 1000))

  let workoutArray = []

  const generator = () => {
    for (let i = 0; i < daysBetween; i++) {
      workoutArray.push({
        raceId: localStorage.getItem("current_race"),
        distanceGoal: "",
        timeGoal: "",
        speedGoal: "",
        workoutDist: "",
        workoutTime: "",
        workoutSpeed: "",
        notes: "",
      })
    }
    workoutArray.map((workout) => addWorkout(workout))
  }
  console.log(workoutArray)

  useEffect(() => {
    generator()
  }, [])
  return (
    <>
      <RaceDisplay {...props} />
      <WorkoutsDisplay {...props} />
    </>
  )
}
