import React, { useEffect, useContext, useState } from "react"
import { RacesContext } from "../races/RacesProvider"
import { currentRaceFinder } from "../helper"

export const RaceInfo = () => {
  const { races, getRaces } = useContext(RacesContext)
  const currentUser = parseInt(localStorage.getItem("app_user_id"))
  const [currentRace, setCurrentRace] = useState({})
  const day = 86400000

  useEffect(() => {
    getRaces()
  }, [])

  // Finds the most recent race for the user and sets the selectedRace state to be passed in state during the navigation
  useEffect(() => {
    setCurrentRace(currentRaceFinder(races, currentUser) || {})
  }, [races])
  console.log(currentRace.date)
  return (
    <>
      <div className="race-info">
        <div className="race-info-box">
          <h3>Race Name: {currentRace.name}</h3>
          <p className="race-date">{new Date(currentRace.date + day).toDateString()}</p>
          <div className="race-particulars">
            <div className="race-left">
              <p>Distance: {currentRace.distance} miles</p>
              <p>City :{currentRace.city}</p>
            </div>
            <div className="race-right">
              <p>Time Goal: {currentRace.goalRaceTime} min</p>
              <p>State: {currentRace.state}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
