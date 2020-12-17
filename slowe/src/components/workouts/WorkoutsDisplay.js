import React, { useContext, useEffect, useState } from "react"
import { WorkoutContext } from "./WorkoutProvider"
import { RacesContext } from "../races/RacesProvider"
import { Workout } from "./Workout"

export const WorkoutsDisplay = (props) => {
  console.log(props)
  const workoutArray = props.currentWorkouts
  const currentRace = props.currentRace
  const startDate = currentRace.startDate
  const raceDate = currentRace.date
  const daysBetween = Math.ceil((raceDate - startDate) / (24 * 60 * 60 * 1000))
  // Sets distance for first workout
  // 1.3
  const startingDist = () => {
    return currentRace.distance * currentRace.startDistPercent
  }
  //  Creates the distance increace for each workout
  const distInc = () => {
    const unfixed = (currentRace.distance - startingDist()) / daysBetween
    const fixed = unfixed.toFixed(2)
    return parseFloat(fixed)
  }

  // These are for determining the speed incrementer and the start run time
  const goalSpeedInMinPerMile = currentRace.goalRaceTime / currentRace.distance
  // 16.5
  const goalSpeedInMPH = currentRace.goalRaceTime / goalSpeedInMinPerMile
  // 2
  const startPaceInMPH = goalSpeedInMPH * currentRace.startPacePercent
  // 1.3
  const startPaceInMinPerMile = parseFloat((currentRace.goalRaceTime / startPaceInMPH).toFixed(1))
  // 25.38

  const speedInc = () => {
    return (
      (currentRace.goalRaceTime / (goalSpeedInMPH * currentRace.startPacePercent) -
        goalSpeedInMinPerMile) /
        daysBetween -
      1
    )
  }
  console.log(speedInc())
  let startDistance = startingDist() - distInc()

  let startSpeed =
    parseFloat(currentRace.distance.toFixed(1)) * parseFloat(startPaceInMinPerMile.toFixed(1)) +
    speedInc()
  return (
    <>
      <h2>WORKOUTS</h2>
      {workoutArray.map((workout) => {
        startDistance += distInc()
        startSpeed = startSpeed - parseFloat(speedInc().toFixed())
        return (
          <Workout key={workout.id} workout={workout} distance={startDistance} speed={startSpeed} />
        )
      })}
    </>
  )
}
