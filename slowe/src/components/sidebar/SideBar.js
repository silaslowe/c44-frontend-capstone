import React, { useContext, useEffect, useState } from "react"
import { currentRaceFinder } from "../helper"
import { WorkoutContext } from "../workouts/WorkoutProvider"
import { CompletedWorkoutsMeter } from "./completedRacesMeter"
import { GoalsMetWorkoutsMeter } from "./goalsMetWorkoutMeter"
import { SpeedGraph } from "./speedGraph"
import { DistanceGraph } from "./distanceGraph"
import { Grommet, Grid, Box, Heading, Text } from "grommet"
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
  const day = 86400000

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
    setSpeedArray(
      completedWorkouts.map((workout) => {
        const woDate = new Date(workout.date - day)
        const woDateShort = woDate.toLocaleString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
        })
        const speedMPH = parseFloat((workout.workoutDist * (60 / workout.workoutTime)).toFixed(2))
        return { date: woDateShort, speedMPH: speedMPH }
      })
    )
  }, [completedWorkouts])

  useEffect(() => {
    const aveSpeedArray = speedArray.map((as) => as.speedMPH)
    const speedTotal = aveSpeedArray.reduce((a, b) => a + b, 0)
    setSpeed(parseFloat(speedTotal / completedWorkouts.length).toFixed(2))
  }, [speedArray])

  useEffect(() => {
    setDistanceArray(
      completedWorkouts.map((workout) => {
        const woDate = new Date(workout.date - day)
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
    setDistance(distanceTotal.toFixed(2))
  }, [completedWorkouts])

  useEffect(() => {
    const distanceTotal = completedWorkouts
      .map((workout) => workout.workoutDist)
      .reduce((a, b) => a + b, 0)
    setAvDistance((distanceTotal / completedWorkouts.length).toFixed(2))
  }, [completedWorkouts])
  return (
    <>
      <Grommet theme={theme}>
        <Box alignSelf="center">
          <Heading level="3" alignSelf="center" margin="small">
            Metrics
          </Heading>
          <Box>
            {/* <Heading level="4" alignSelf="center" margin={{ "top": "medium", "bottom": "xsmall" }}>
              Overall Workout Stats
            </Heading> */}
            <Box direction="row" alignSelf="center" elevation="large" margin="medium">
              <Text margin="medium"> Avg. MPH: {speed || 0}</Text>
              <Text margin="medium"> Avg. Distance: {avDistance || 0} miles</Text>
              <Text margin="medium"> Total Dist.: {distance || 0} miles</Text>
            </Box>
          </Box>
          {/* Graphics */}

          <Box direction="row-responsive" alignSelf="center">
            <Box gridArea="speed" margin="medium" elevation="large">
              <SpeedGraph {...props} speedArray={speedArray} />
            </Box>
            <Box gridArea="dist" margin="medium" elevation="large">
              <DistanceGraph {...props} distanceArray={distanceArray} />
            </Box>
          </Box>
          <Box direction="row-responsive" alignSelf="center">
            <Box gridArea="completed" margin="medium" elevation="large">
              <CompletedWorkoutsMeter {...props} completedWo={completedWo} />
            </Box>
            <Box gridArea="goalMet" margin="medium" elevation="large">
              <GoalsMetWorkoutsMeter {...props} goalsMetWo={goalsMetWo} />
            </Box>
          </Box>
        </Box>
      </Grommet>
    </>
  )
}

{
  /* <Grid
rows={["auto", "auto"]}
columns={["1/2", "1/2"]}
areas={[
  ["completed", "goalMet"],
  ["speed", "dist"],
]}
gap="small"
alignSelf="center"
margin={{ "bottom": "medium" }}
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
</Grid> */
}
