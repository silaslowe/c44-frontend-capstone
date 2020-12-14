import React, { useEffect, useContext } from "react"
import { WorkoutContext } from "../workouts/WorkoutProvider"

export const RaceInfo = (props) => {
  const { workouts, getWorkoutsByRace, getWorkouts } = useContext(WorkoutContext)

  const currentRace = props.location.state.currentRace
  let name = currentRace.name
  let city = currentRace.city
  let state = currentRace.state
  let distance = currentRace.distance
  let date = currentRace.date
  let raceDate = new Date(date).toDateString()

  console.log("RI", props)

  // useEffect(() => {
  //   getWorkoutsByRace(currentRace.id).then(() => {
  //     console.log(workouts)
  //   })
  // }, [])
  useEffect(() => {
    getWorkouts().then(() => {
      console.log(workouts)
    })
  }, [])

  return (
    <>
      <div className="race-box">
        <h3>Name: {name}</h3>
        <p>Distance: {distance} miles</p>
        <p>City :{city}</p>
        <p>State: {state}</p>
        <p>Date: {raceDate}</p>
      </div>
    </>
  )
}
