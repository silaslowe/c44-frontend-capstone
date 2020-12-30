import React, { useState, useEffect, useContext } from "react"
import { WorkoutContext } from "./WorkoutProvider"
import { RacesContext } from "../races/RacesProvider"
import { Workout } from "./Workout"
import { currentRaceFinder } from "../helper"
import { RaceResultForm } from "../raceResults/RaceResultForm"
import { Box, Grommet, Heading } from "grommet"
import { theme } from "../../theme"

export const WorkoutList = (props) => {
  const { getRaces, races } = useContext(RacesContext)
  const { workouts, getWorkouts } = useContext(WorkoutContext)
  const [currentRace, setCurrentRace] = useState({})
  const [currentWorkouts, setCurrentWorkouts] = useState([])
  const currentUser = parseInt(localStorage.getItem("app_user_id"))
  const [startDate, setStartDate] = useState("")
  const [raceDate, setRaceDate] = useState("")
  const [daysBetween, setDaysBetween] = useState("")
  const [distInc, setDistInc] = useState("")
  const [speedInc, setSpeedInc] = useState("")
  const [startSpeed, setStartPaceInMPM] = useState("")
  const [startDist, setStartDist] = useState("")
  const [startTime, setStartTime] = useState("")
  const [mph, setMPH] = useState("")

  // gets current date for later use
  const today = new Date().getTime()
  // a day in ms
  const day = 86400000
  // starting distance - the incrementer that will get added in iteration
  let workoutDist = startDist
  let startingSpeed = (parseFloat(startSpeed) - speedInc) * workoutDist
  let workoutTime = startTime
  let dateForCard = ""
  let mphPace = mph

  // Finds all races
  useEffect(() => {
    getRaces()
  }, [])

  // Finds the most current race for the current user and sets the SV currentRace
  useEffect(() => {
    setCurrentRace(currentRaceFinder(races, currentUser))
  }, [races])

  // Finds all the WOs
  useEffect(() => {
    getWorkouts()
  }, [races])

  // Finds the workouts for the current race and sets the SV currentWorkouts
  useEffect(() => {
    setCurrentWorkouts(workouts.filter((workout) => workout.raceId === currentRace.id))
  }, [races, workouts])

  // Sets SV for the starting date of training and the date of the race as well as the SV for the days between the two
  useEffect(() => {
    generateDays()
  }, [currentRace])

  useEffect(() => {
    createSpeedInc()
  }, [currentRace, currentWorkouts])

  useEffect(() => {
    setStartDist(currentRace.distance * currentRace.startDistPercent)
  }, [currentRace, workouts])

  useEffect(() => {
    createDistInc()
  }, [currentRace, workouts])

  //  Creates the distance increace for each workout
  const createDistInc = () => {
    const unfixed = (currentRace.distance - startDist) / daysBetween
    const fixed = unfixed.toFixed(2)
    return setDistInc(parseFloat(fixed))
  }

  // These are for determining the speed incrementer and the start run time
  const createSpeedInc = () => {
    const goalPaceInMPM = parseFloat((currentRace.goalRaceTime / currentRace.distance).toFixed(3))
    // console.log(goalPaceInMPM)
    const goalPaceInMPH = parseFloat((60 / goalPaceInMPM).toFixed(2))
    const startPaceInMPH = parseFloat((goalPaceInMPH * currentRace.startPacePercent).toFixed(2))
    const startPaceInMPM = 60 / startPaceInMPH
    // console.log(startPaceInMPM)
    setStartPaceInMPM(parseFloat(startPaceInMPM.toFixed(2)))
    // Correct
    setStartTime(startPaceInMPM * (startDist + distInc))
    // console.log(startTime)

    // console.log(goalPaceInMPH)
    setMPH(startPaceInMPH)
    const speedIncrenementer = () => {
      return (goalPaceInMPH - startPaceInMPH) / daysBetween
    }
    setSpeedInc(speedIncrenementer())
  }

  const generateDays = () => {
    setStartDate(currentRace.startDate)
    setRaceDate(currentRace.date)
    setDaysBetween(Math.ceil((raceDate - startDate) / (24 * 60 * 60 * 1000)))
  }
  return (
    <>
      <Grommet theme={theme}>
        <Box alignContent="center">
          <Heading level="3" alignSelf="center" margin={{ "top": "xxsmall", "bottom": "large" }}>
            WORKOUTS
          </Heading>
          <Box
            alignSelf="center"
            width="large"
            alignContent="center"
            elevation="large"
            pad={{ "top": "large", "bottom": "large" }}
            className="workout-container"
            background="light-5"
          >
            {currentWorkouts.map((workout) => {
              workoutDist += distInc

              mphPace += speedInc
              let woTime = workoutDist * (60 / mphPace)
              const woDate = workout.date - day
              const readableDate = new Date(woDate)

              dateForCard = readableDate.toLocaleString("en-US", {
                month: "numeric",
                day: "numeric",
                year: "numeric",
              })
              return (
                <Workout
                  key={workout.id}
                  {...props}
                  workout={workout}
                  distance={workoutDist}
                  speed={mphPace}
                  time={woTime}
                  date={dateForCard}
                  today={today}
                />
              )
            })}
          </Box>
        </Box>
        <Box>
          <Box
            alignSelf="center"
            width="xlarge"
            border={{ "side": "bottom" }}
            margin={{ "top": "large" }}
          ></Box>
        </Box>
        <RaceResultForm {...props} currentRace={currentRace} />
      </Grommet>
    </>
  )
}
