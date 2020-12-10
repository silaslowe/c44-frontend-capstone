import React, { useContext, useEffect } from "react"
import { RaceDisplay } from "../mainpage/RaceDisplay"
import { RacesContext } from "../races/RacesProvider"
import { Workout } from "./Workout"
import { WorkoutContext } from "./WorkoutProvider"
import { WorkoutsDisplay } from "./WorkoutsDisplay"

export const WorkoutGenerator = (props) => {
  const { getSelectedRace, selectedRace } = useContext(RacesContext)
  const { addWorkout } = useContext(WorkoutContext)

  // Waits for selectedRace to be assessed to the dates can be subtraced and the days between can be generated.
  let startDate = ""
  let raceDate = ""
  let workoutArray = []

  // Gets the most current race for a given user and then sets the local storage to use that race Id as the "current_race"
  useEffect(() => {
    getSelectedRace().then(localStorage.setItem("current_race", selectedRace.id))
  }, [])

  // If there are no races for the user this will redirect the user to the race form page.
  if (localStorage.getItem("current_race") === "undefined") {
    props.history.push("/raceform")
  }

  // If there is a race for the user then this sets the localStorage to store that races Id
  localStorage.setItem("current_race", selectedRace.id)

  const generator = () => {
    startDate = selectedRace.startDate
    raceDate = selectedRace.date
    const daysBetween = Math.ceil((raceDate - startDate) / (24 * 60 * 60 * 1000))

    for (let i = 0; i < daysBetween; i++) {
      workoutArray.push({
        raceId: parseInt(localStorage.getItem("current_race")),
        distanceGoal: selectedRace.distance,
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
