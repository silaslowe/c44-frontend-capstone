import React, { useContext, useEffect, useState } from "react"
import { WorkoutContext } from "./WorkoutProvider"
import { RacesContext } from "../races/RacesProvider"
export const WorkoutGenerator = (props) => {
  const { getWorkouts, workouts, setWorkouts, addWorkout, getWorkoutsByRace } = useContext(
    WorkoutContext
  )
  // const [workoutsGenerated, setWorkoutsGenerated] = useState("")
  const { race, getRaceById, races } = useContext(RacesContext)
  const [generated, setGenerated] = useState(false)
  const currentRace = props.location.state.currentRace
  const currentRaceId = props.location.state.currentRace.id
  let startDate = ""
  let raceDate = ""
  let daysBetween = ""
  let workoutArray = []
  // let filteredWorkouts = workouts.filter((workout) => {
  //   return workout.raceId === 13
  // })
  const [filteredWorkouts, setFilteredWorkouts] = useState([])
  // useEffect(() => {
  //   getWorkouts()
  // }, [])

  useEffect(() => {
    getWorkouts()
  }, [])

  useEffect(() => {
    setFilteredWorkouts(workouts.filter((workout) => workout.raceId === currentRace.id))
  }, [workouts])

  // useEffect(() => {
  //   generator()
  // }, [races])

  // useEffect(() => {
  //   getWorkoutsByRace(14)
  // }, [])

  console.log(workouts)
  console.log(filteredWorkouts)

  const generator = () => {
    // filters the workouts by the current races

    startDate = currentRace.startDate
    raceDate = currentRace.date
    // determines the days between the the start of training and the race date
    daysBetween = Math.ceil((raceDate - startDate) / (24 * 60 * 60 * 1000))

    // if the amount of filtered workouts is less than days between, which is the needed amount, the for loop gernerates a workout card for each day of training and pushed it into the workoutARray.
    if (filteredWorkouts < daysBetween) {
      for (let i = 0; i < daysBetween; i++) {
        workoutArray.push({
          raceId: currentRace.id,
          distanceGoal: currentRace.distance,
          timeGoal: currentRace.goalRaceTime,
          workoutDist: currentRace.distance,
          workoutTime: "",
          workoutSpeed: "",
          notes: "",
          userId: parseInt(localStorage.getItem("app_user_id")),
        })
      }
      // if there are the required amount of training objects then the filtered workouts are spread into the workoutArray. It also sets the state of generated which deterimines whether the training objects have been created or need to be.
    } else {
      workoutArray = [...filteredWorkouts]
      setGenerated(true)
    }

    console.log(generated)

    // if generated is false the workoutArray is mapped over and the addWorkout function from the provider is applied to all each, thus generating a workout in the DB
    if (generated === false) {
      console.log("add")
      // return workoutArray.map((workout) => addWorkout(workout))
      // If generated is true and the cards had previously been created then they are passed throught the editWorkouts function instead.
    } else {
      console.log("edit")
    }
  }

  return (
    <>
      <h1>Generating for You</h1>
      {}
    </>
  )
}
