import React, { useState, useEffect, useContext } from "react"
import { WorkoutContext } from "./WorkoutProvider"
import { RacesContext } from "../races/RacesProvider"
import { Workout } from "./Workout"

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
  const [startSpeed, setStartSpeed] = useState("")
  const [startDist, setStartDist] = useState("")
  const [startTime, setStartTime] = useState("")

  // gets current date for later use
  const today = new Date().getTime()
  // a day in ms
  const day = 86400000
  // starting distance - the incrementer that will get added in iteration
  let startingDist = startDist - distInc
  let startingSpeed = (parseFloat(startSpeed) - speedInc) * startingDist
  let startingTime = startTime
  let dateForCard = ""

  // Finds the most recent race for the user and sets the selectedRace state to be passed in state during the navigation
  useEffect(() => {
    getRaces()
  }, [])

  useEffect(() => {
    setCurrentRace(currentRaceFinder())
  }, [races])

  useEffect(() => {
    getWorkouts()
  }, [races])

  useEffect(() => {
    setCurrentWorkouts(workouts.filter((workout) => workout.raceId === currentRace.id))
  }, [races, workouts])

  // Probably overly complex logic to filter the users races to find the most recent
  const currentRaceFinder = () => {
    const racesForUser = races.filter((race) => race.userId === currentUser)
    const raceStartDate = racesForUser.map((race) => race.startDate)
    const newestRace = Math.max(...raceStartDate)
    const currentRace = racesForUser.find((race) => race.startDate === newestRace)
    return currentRace
  }

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

  useEffect(() => {
    currentWorkouts.map((wo) => {
      let woDate = new Date(wo.date - day)
    })
  }, [currentWorkouts, currentRace])

  //  Creates the distance increace for each workout
  const createDistInc = () => {
    const unfixed = (currentRace.distance - startDist) / daysBetween
    const fixed = unfixed.toFixed(2)
    return setDistInc(parseFloat(fixed))
  }

  // These are for determining the speed incrementer and the start run time
  const createSpeedInc = () => {
    const goalSpeedInMinPerMile = currentRace.goalRaceTime / currentRace.distance
    const goalSpeedInMPH = currentRace.goalRaceTime / goalSpeedInMinPerMile
    const startPaceInMPH = goalSpeedInMPH * currentRace.startPacePercent
    const startPaceInMPM = (currentRace.goalRaceTime / startPaceInMPH).toFixed(2)
    setStartSpeed(startPaceInMPM)
    setStartTime(startPaceInMPM * startDist)
    const speedInc = () => {
      return (
        (currentRace.goalRaceTime / (goalSpeedInMPH * currentRace.startPacePercent) -
          goalSpeedInMinPerMile) /
        (daysBetween - 1)
      )
    }
    setSpeedInc(speedInc())
  }

  const generateDays = () => {
    setStartDate(currentRace.startDate)
    setRaceDate(currentRace.date)
    setDaysBetween(Math.ceil((raceDate - startDate) / (24 * 60 * 60 * 1000)))
  }
  return (
    <>
      <div className="workouts">
        <div className="workout-container">
          <h2>WORKOUTS</h2>
          {currentWorkouts.map((workout) => {
            startingDist += distInc
            startingSpeed += speedInc
            startingTime = startingDist * startingSpeed
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
                distance={startingDist}
                speed={startingSpeed}
                time={startingTime}
                date={dateForCard}
                today={today}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}
