import React, { useContext, useEffect, useState } from "react"
import { RacesContext } from "../races/RacesProvider"
import { WorkoutContext } from "./WorkoutProvider"
import { WorkoutsDisplay } from "./WorkoutsDisplay"

export const WorkoutGenerator = (props) => {
  const { getSelectedRace, selectedRace, getRaces, races } = useContext(RacesContext)
  const { addWorkout, getWorkouts, workouts, setWorkouts } = useContext(WorkoutContext)
  const [currentRace, setCurrentRace] = useState({})
  const currentUser = parseInt(localStorage.getItem("app_user_id"))

  // console.log("GENPROPS", props)

  // Waits for selectedRace to be assessed to the dates can be subtraced and the days between can be generated.
  let startDate = ""
  let raceDate = ""
  let workoutArray = []

  useEffect(() => {
    getWorkouts()
  }, [])

  useEffect(() => {
    getRaces().then(filterRaces)
  }, [])

  const filterRaces = () => {
    const filteredRace = races
      .filter((got) => got.userId === currentUser)
      .sort((a, b) => b.startDate - a.startDate)
    setCurrentRace(filteredRace[0])
  }
  console.log(currentRace)

  const filterWorkouts = () => {
    const currentRace = localStorage.getItem("app_user_id")
    // console.log(currentRace)
    const selectedRaceWorkouts = workouts.filter(
      (workout) => workout.raceId === parseInt(currentRace)
    )
    setWorkouts(selectedRaceWorkouts)
  }

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
      <WorkoutsDisplay {...props} />
      {/* <h1>Generating</h1> */}
    </>
  )
}
