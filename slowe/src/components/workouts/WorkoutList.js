import React, { useState, useEffect, useContext } from "react"
import { WorkoutContext } from "./WorkoutProvider"
import { RacesContext } from "../races/RacesProvider"
import { Workout } from "./Workout"
import { currentRaceFinder } from "../helper"

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
        daysBetween
      )
    }
    setSpeedInc(speedInc())
  }

  const generateDays = () => {
    setStartDate(currentRace.startDate)
    setRaceDate(currentRace.date)
    setDaysBetween(Math.ceil((raceDate - startDate) / (24 * 60 * 60 * 1000)))
  }
  console.log(currentRace)
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
