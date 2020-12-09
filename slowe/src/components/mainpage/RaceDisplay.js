import React, { useContext, useEffect } from "react"
import { RacesContext } from "../races/RacesProvider"
import { Link } from "react-router-dom"

export const RaceDisplay = (props) => {
  const { getSelectedRace, selectedRace } = useContext(RacesContext)

  useEffect(() => {
    getSelectedRace()
  }, [])

  const name = selectedRace.name
  const city = selectedRace.city
  const state = selectedRace.state
  const distance = selectedRace.distance
  const date = selectedRace.date
  const raceDate = new Date(date).toDateString()

  return (
    <>
      <div className="race-box">
        <h3>Name: {name}</h3>
        <p>Distance: {distance} miles</p>
        <p>City :{city}</p>
        <p>State:{state}</p>
        <p>Date: {raceDate}</p>
        <button>
          <Link to="/raceform"> Form </Link>
        </button>
      </div>
    </>
  )
}
