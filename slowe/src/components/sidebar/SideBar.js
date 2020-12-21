import React, { useContext, useEffect, useState } from "react"
import { WorkoutContext } from "../workouts/WorkoutProvider"

export const SideBar = (props) => {
  const { getWorkouts, workouts } = useContext(WorkoutContext)
  const [currentWorkouts, setCurrentWorkouts] = useState([])
  const [speed, setSpeed] = useState("")
  const [distance, setDistance] = useState("")
  const [avDistance, setAvDistance] = useState("")
  const [completedWorkouts, setCompletedWorkouts] = useState([])
  const [metGoals, setMetGoals] = useState("")
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
    setMetGoals(currentWorkouts.filter((workout) => workout.metGoal === true))
  }, [])
  useEffect(() => {
    const speedTotal = completedWorkouts
      .map((workout) => {
        return parseFloat((workout.workoutTime / workout.workoutDist).toFixed(2))
      })
      .reduce((a, b) => a + b, 0)
    setSpeed(speedTotal / completedWorkouts.length || 0)
    console.log(speedTotal, completedWorkouts.length)
  }, [completedWorkouts])

  useEffect(() => {
    const distanceTotal = completedWorkouts
      .map((workout) => workout.workoutDist)
      .reduce((a, b) => a + b, 0)
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
      <div className="sidebar-container">
        <div className="sidebar">
          <h1>Metrics</h1>
          <p>
            Total Compeleted Workouts: {completedWorkouts.length}/{currentWorkouts.length}
          </p>
          {/* <p>Total Workout Goals Met: {metGoals.length}</p> */}
          <p> Average Speed: {speed || 0} MPH</p>
          <p>Total Distance:{distance} Miles</p>
          <p>Average Distance: {avDistance || 0} Miles</p>
        </div>
      </div>
    </>
  )
}
