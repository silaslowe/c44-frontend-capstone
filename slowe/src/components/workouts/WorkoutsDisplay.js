import React, { useContext, useEffect } from "react"
import { WorkoutContext } from "./WorkoutProvider"

export const WorkoutsDisplay = () => {
  const { getWorkoutsByRace, workouts } = useContext(WorkoutContext)

  useEffect(() => {
    getWorkoutsByRace().then(() => console.log(workouts))
  }, [])
  return <>Workouts Display</>
}
