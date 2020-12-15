import React, { useEffect, useContext, useState } from "react"
import { RaceContext, RacesContext } from "../races/RacesProvider"

export const RaceInfo = (props) => {
  const { races, getRaces } = useContext(RacesContext)
  const currentUser = parseInt(localStorage.getItem("app_user_id"))
  const [currentRace, setCurrentRace] = useState({})

  useEffect(() => {
    getRaces()
  }, [])

  // Finds the most recent race for the user and sets the selectedRace state to be passed in state during the navigation
  useEffect(() => {
    setCurrentRace(currentRaceFinder() || {})
  }, [races])

  const currentRaceFinder = () => {
    const racesForUser = races.filter((race) => race.userId === currentUser)
    const raceStartDate = racesForUser.map((race) => race.startDate)
    const newestRace = Math.max(...raceStartDate)
    const currentRace = racesForUser.find((race) => race.startDate === newestRace)
    return currentRace
  }

  // console.log("races", races)
  // console.log("selectedRace", currentRace)

  // let name = currentRace.name
  // let city = currentRace.city
  // let state = currentRace.state
  // let distance = currentRace.distance
  // let date = currentRace.date
  // let raceDate = new Date(date).toDateString()

  return (
    <>
      <div className="race-box">
        <h3>Name: {currentRace.name}</h3>
        <p>Distance: {currentRace.distance} miles</p>
        <p>City :{currentRace.city}</p>
        <p>State: {currentRace.state}</p>
        <p>Date: {new Date(currentRace.date).toDateString()}</p>
      </div>
    </>
  )
}
