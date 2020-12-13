import React, { useContext, useEffect, useState } from "react"
import { RacesContext } from "../races/RacesProvider"
import { WorkoutContext } from "./WorkoutProvider"
import { WorkoutsDisplay } from "./WorkoutsDisplay"
import { Workout } from "./Workout"

export const WorkoutGenerator = (props) => {
  const { addWorkout, workouts, editWorkout, getWorkoutsByRace, getWorkouts } = useContext(
    WorkoutContext
  )

  console.log("WOG", props)
  const { races } = useContext(RacesContext)
  const [workoutsGenerated, setWorkoutsGenerated] = useState("")
  const currentUser = parseInt(localStorage.getItem("app_user_id"))
  const currentRace = props.location.state.currentRace
  // Waits for selectedRace to be assessed to the dates can be subtraced and the days between can be generated.
  let startDate = ""
  let raceDate = ""
  let daysBetween = ""
  let workoutArray = []
  // gets workouts and filters them for this race and generates workout objects
  useEffect(() => {
    setWorkoutsGenerated(false)
  }, [])

  useEffect(() => {
    getWorkouts()
      .then(() => console.log("USE", workouts))
      .then(generator())
  }, [races])

  const generator = () => {
    const currentWorkouts = workouts.filter((workout) => workout.raceId === currentRace.id)
    startDate = currentRace.startDate
    raceDate = currentRace.date
    daysBetween = Math.ceil((raceDate - startDate) / (24 * 60 * 60 * 1000))
    workoutArray = [...workouts]
    if (currentWorkouts.length === 0) {
      for (let i = 0; i < daysBetween; i++) {
        workoutArray.push({
          raceId: currentRace.id,
          distanceGoal: currentRace.distance,
          timeGoal: currentRace.goalRaceTime,
          speedGoal: "",
          workoutDist: currentRace.distance,
          workoutTime: "",
          workoutSpeed: "",
          notes: "",
          userId: currentUser,
        })
      }
    } else {
      workoutArray = [...workouts]
      console.log("WOA", workoutArray)
    }
  }

  // const addOrEditRace = () => {
  //   console.log(workoutsGenerated)
  //   if (workoutsGenerated === false) {
  //     workoutArray.map((workout) => addWorkout(workout))
  //     setWorkoutsGenerated(true)
  //     console.log(workoutsGenerated)
  //   } else {
  //     workoutArray = [...workouts]
  //     workoutArray.map((workout) =>
  //       editWorkout({
  //         userId: currentUser,
  //         timeGoal: currentRace.goalRaceTime,
  //         id: workout.id,
  //         raceId: currentRace.id,
  //       })
  //     )
  //   }
  // }

  return (
    <>
      {workoutArray.map((workout) => (
        <Workout key={workout.id} workout={workout} />
      ))}
    </>
  )
}
