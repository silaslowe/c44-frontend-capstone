import React, { useContext, useEffect } from "react"
import { WorkoutContext } from "./WorkoutProvider"
import { RacesContext } from "../races/RacesProvider"
import { Workout } from "./Workout"

export const WorkoutsDisplay = (props) => {
  const { getWorkouts, workouts, setWorkouts } = useContext(WorkoutContext)
  const { getRaces, races } = useContext(RacesContext)

  useEffect(() => {
    getWorkouts().then(setWorkouts(findWorkouts()))
  }, [])

  const findWorkouts = () => {
    const raceWorkouts = workouts.filter((workout) => workout.raceId === props.currentRace.id)
    return raceWorkouts
  }
  return (
    <>
      <h1>PLACEHOLDERerers</h1>
      {workouts.map((workout) => (
        <Workout key={workout.id} workout={workout} />
      ))}
    </>
  )
}

//   /
