import React from "react"

export const RaceInfo = (props) => {
  const currentRace = props.location.state.currentRace
  let name = currentRace.name
  let city = currentRace.city
  let state = currentRace.state
  let distance = currentRace.distance
  let date = currentRace.date
  let raceDate = new Date(date).toDateString()
  console.log("RI", props)
  return (
    <>
      <div className="race-box">
        <h3>Name: {name}</h3>
        <p>Distance: {distance} miles</p>
        <p>City :{city}</p>
        <p>State: {state}</p>
        <p>Date: {raceDate}</p>
      </div>
    </>
  )
}
