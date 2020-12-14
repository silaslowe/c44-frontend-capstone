import React, { useContext, useEffect } from "react"
import { WorkoutContext } from "./WorkoutProvider"
import { RacesContext } from "../races/RacesProvider"
import { Workout } from "./Workout"

export const WorkoutsDisplay = (props) => {
  console.log(props)
  const workoutArray = props.currentWorkouts
  console.log("WD WOA", workoutArray)
  return (
    <>
      <h2>WORKOUTS</h2>
      {workoutArray.map((workout) => (
        <Workout key={workout.id} workout={workout} />
      ))}
    </>
  )
}
