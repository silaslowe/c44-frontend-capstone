import React, { useContext, useEffect, useState } from "react"
import { currentRaceFinder } from "../helper"
import { WorkoutContext } from "../workouts/WorkoutProvider"
import { CompletedWorkoutsMeter } from "./completedRacesMeter"
import { GoalsMetWorkoutsMeter } from "./goalsMetWorkoutMeter"
import { SpeedGraph } from "./speedGraph"
import { DistanceGraph } from "./distanceGraph"
import { Grommet, Grid, Box, Heading } from "grommet"
import { theme } from "../../theme"

export const SideBar = (props) => {
  const { getWorkouts, workouts } = useContext(WorkoutContext)
  const [currentWorkouts, setCurrentWorkouts] = useState([])
  const [speed, setSpeed] = useState("")
  const [distance, setDistance] = useState("")
  const [avDistance, setAvDistance] = useState("")
  const [completedWorkouts, setCompletedWorkouts] = useState([])
  const [metGoals, setMetGoals] = useState("")
  const [speedArray, setSpeedArray] = useState([])
  const [distanceArray, setDistanceArray] = useState([])
  const completedWo = parseFloat(
    ((completedWorkouts.length / currentWorkouts.length) * 100).toFixed(0)
  )
  const goalsMetWo = parseFloat(((metGoals.length / currentWorkouts.length) * 100).toFixed(0))

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
  }, [currentWorkouts])

  useEffect(() => {
    const speedTotal = completedWorkouts
      .map((workout) => {
        return parseFloat((workout.workoutTime / workout.workoutDist).toFixed(2))
      })
      .reduce((a, b) => a + b, 0)
    setSpeed(speedTotal / completedWorkouts.length || 0)
  }, [completedWorkouts])

  useEffect(() => {
    setSpeedArray(
      completedWorkouts.map((workout) => {
        const woDate = new Date(workout.date)
        const woDateShort = woDate.toLocaleString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
        })
        const speedMPH = parseFloat((workout.workoutDist * (workout.workoutTime / 60)).toFixed(2))
        return { date: woDateShort, speedMPH: speedMPH }
      })
    )
  }, [completedWorkouts])

  useEffect(() => {
    setDistanceArray(
      completedWorkouts.map((workout) => {
        const woDate = new Date(workout.date)
        const woDateShort = woDate.toLocaleString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
        })
        const woDist = parseFloat(workout.workoutDist.toFixed(2))
        return { date: woDateShort, distance: woDist }
      })
    )
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
    setAvDistance(distanceTotal / completedWorkouts.length)
  }, [completedWorkouts])
  return (
    <>
      <Grommet theme={theme}>
        <Box alignSelf="center">
          <Heading level="3" alignSelf="center">
            Metrics
          </Heading>
          <Grid
            rows={["auto", "auto"]}
            columns={["1/2", "1/2"]}
            areas={[
              ["completed", "goalMet"],
              ["speed", "dist"],
            ]}
            gap="small"
            alignSelf="center"
          >
            <Box gridArea="completed" margin="medium" elevation="large">
              <CompletedWorkoutsMeter {...props} completedWo={completedWo} />
            </Box>
            <Box gridArea="goalMet" margin="medium" elevation="large">
              <GoalsMetWorkoutsMeter {...props} goalsMetWo={goalsMetWo} />
            </Box>
            <Box gridArea="speed" margin="medium" elevation="large">
              <SpeedGraph {...props} speedArray={speedArray} />
            </Box>
            <Box gridArea="dist" margin="medium" elevation="large">
              <DistanceGraph {...props} distanceArray={distanceArray} />
            </Box>
          </Grid>
        </Box>
      </Grommet>
    </>
  )
}
// ;<Grid
//   rows={["auto", "flex"]}
//   columns={["auto", "flex"]}
//   gap="small"
//   areas={[
//     { name: "header", start: [0, 0], end: [1, 0] },
//     { name: "nav", start: [0, 1], end: [0, 1] },
//     { name: "main", start: [1, 1], end: [1, 1] },
//   ]}
// >
//   <Box gridArea="header" background="brand" />
//   <Box gridArea="nav" background="light-5" />
//   <Box gridArea="main" background="light-2" />
// </Grid>

// <p>
//           Total Workout Goals Met: {metGoals.length}/ {currentWorkouts.length}
//         </p>
//         <p> Average Speed: {speed || 0} MPH</p>
//         <p>Total Distance:{distance} Miles</p>
//         <p>Average Distance: {avDistance || 0} Miles</p>
//         Total Compeleted Workouts: {completedWorkouts.length}/{currentWorkouts.length}
