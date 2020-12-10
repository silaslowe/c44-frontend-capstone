import React, { useContext, useEffect } from "react"
import { WorkoutContext } from "./WorkoutProvider"
import { Workout } from "./Workout"

export const WorkoutsDisplay = () => {
  const { getWorkoutsByRace, workouts, getWorkouts } = useContext(WorkoutContext)

  useEffect(() => {
    getWorkoutsByRace()
  }, [])

  return (
    <>
      {workouts.map((workout) => (
        <Workout key={workout.id} workout={workout} />
      ))}
    </>
  )
}
