import React, { useContext, useEffect } from "react"
import { WorkoutContext } from "./WorkoutProvider"
import { RacesContext } from "../races/RacesProvider"
import { Workout } from "./Workout"

export const WorkoutsDisplay = (props) => {
  // console.log(props)
  const { getWorkouts, workouts } = useContext(WorkoutContext)
  const { getRaces, races } = useContext(RacesContext)

  useEffect(() => {
    getRaces()
  }, [])

  useEffect(() => {
    getWorkouts()
  }, [])

  const populateRaces = () => {
    const user = parseInt(localStorage.getItem("app_user_id"))
    const selectedRace = races
      .filter((race) => race.userId === user)
      .sort((a, b) => b.date - a.date)[0]
    return selectedRace
  }

  // console.log("IN WOD", props)
  return (
    <>
      <h1>PLACEHOLDERerers</h1>
    </>
  )
}

//   /* {workouts.map((workout) => (
//         <Workout key={workout.id} workout={workout} />
//       ))} */
// }
