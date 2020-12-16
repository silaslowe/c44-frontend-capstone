import React, { useContext, useEffect } from "react"
import { WorkoutContext } from "../workouts/WorkoutProvider"

export const SideBar = (props) => {
  const { getWorkouts, workouts } = useContext(WorkoutContext)

  useEffect(() => {
    getWorkouts().then(() =>
      workouts.filter((workout) => workout.raceId === localStorage.getItem("current_race"))
    )
  }, [])

  console.log(workouts)
  return (
    <>
      <h1>SideBar</h1>
    </>
  )
}
