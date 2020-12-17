import React, { useContext, useEffect, useState } from "react"
import { WorkoutContext } from "../workouts/WorkoutProvider"

export const SideBar = (props) => {
  const { getWorkouts, workouts } = useContext(WorkoutContext)
  const [currentWorkouts, setCurrentWorkouts] = useState([])
  const [speed, setSpeed] = useState("")
  const [distance, setDistance] = useState("")
  const [avDistance, setAvDistance] = useState("")
  const [completedWorkouts, setCompletedWorkouts] = useState([])
  console.log(props)
  useEffect(() => {
    getWorkouts()
  }, [])

  useEffect(() => {
    setCurrentWorkouts(
      workouts.filter((workout) => {
        return workout.raceId === parseInt(localStorage.getItem("current_race"))
      })
    )
  }, [workouts])

  useEffect(() => {
    setCompletedWorkouts(currentWorkouts.filter((workout) => workout.isComplete === true))
  }, [currentWorkouts])

  useEffect(() => {
    const speedTotal = completedWorkouts
      .map((workout) => {
        return parseFloat((workout.workoutTime / workout.workoutDist).toFixed(2))
      })
      .reduce((a, b) => a + b, 0)
    setSpeed((speedTotal / completedWorkouts.length).toFixed(2))
  }, [completedWorkouts])

  useEffect(() => {
    const distanceTotal = completedWorkouts
      .map((workout) => workout.workoutDist)
      .reduce((a, b) => a + b, 0)
    console.log(distanceTotal)
    setDistance(distanceTotal)
  }, [completedWorkouts])

  useEffect(() => {
    const distanceTotal = completedWorkouts
      .map((workout) => workout.workoutDist)
      .reduce((a, b) => a + b, 0)
    console.log(distanceTotal)
    setAvDistance(distanceTotal / completedWorkouts.length)
  }, [completedWorkouts])

  return (
    <>
      <h1>SideBar</h1>
      <p>
        Total Compeleted Workouts:
        {completedWorkouts.length}
      </p>
      <p> Average Speed: {speed || 0} MPH</p>
      <p>Total Distance:{distance} Miles</p>
      <p>Average Distance: {avDistance || 0} Miles</p>
    </>
  )
}
