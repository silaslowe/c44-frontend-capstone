import React, { useContext, useEffect } from "react"
import { RacesContext } from "../races/RacesProvider"
import { WorkoutContext } from "./WorkoutProvider"
import { WorkoutsDisplay } from "./WorkoutsDisplay"

export const WorkoutGenerator = (props) => {
  const { getSelectedRace, selectedRace } = useContext(RacesContext)
  const { addWorkout, getWorkouts, workouts, setWorkouts } = useContext(WorkoutContext)

  // if (localStorage.getItem("current_race") === "undefined") {
  //   props.history.push("/raceform")
  // }

  // Waits for selectedRace to be assessed to the dates can be subtraced and the days between can be generated.
  let startDate = ""
  let raceDate = ""
  let workoutArray = []

  useEffect(() => {
    getWorkouts().then(filterWorkouts())
  }, [])

  const filterWorkouts = () => {
    const currentRace = localStorage.getItem("current_race")
    // console.log(currentRace)
    const selectedRaceWorkouts = workouts.filter(
      (workout) => workout.raceId === parseInt(currentRace)
    )
    setWorkouts(selectedRaceWorkouts)
  }
  // Gets the most current race for a given user and then sets the local storage to use that race Id as the "current_race"
  useEffect(() => {
    getSelectedRace()
      .then(() => filterWorkouts())
      .then(() => generator())
  }, [])

  // If there are no races for the user this will redirect the user to the race form page.

  const generator = () => {
    startDate = props.startDate
    raceDate = props.date
    const daysBetween = Math.ceil((raceDate - startDate) / (24 * 60 * 60 * 1000))
    if (workouts.length === 0) {
      for (let i = 0; i < daysBetween; i++) {
        workoutArray.push({
          raceId: parseInt(localStorage.getItem("current_race")),
          distanceGoal: props.distance,
          timeGoal: "",
          speedGoal: "",
          workoutDist: "",
          workoutTime: "",
          workoutSpeed: "",
          notes: "",
        })
      }
    }
    workoutArray.map((workout) => addWorkout(workout))
  }

  return (
    <>
      {/* <WorkoutsDisplay {...props} /> */}
      <h1>Hi</h1>
    </>
  )
}
