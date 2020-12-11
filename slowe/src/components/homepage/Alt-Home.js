import React, { useContext, useEffect, useState } from "react"
import { RacesContext, RacesProvider } from "../races/RacesProvider"
import { Route, Redirect } from "react-router-dom"
import { WorkoutProvider } from "../workouts/WorkoutProvider"
import { RaceDisplay } from "../races/RaceDisplay"
import { WorkoutGenerator } from "../workouts/WorkoutGenerator"
import { RaceForm } from "../races/RaceForm"

export const AltHome = (props) => {
  const { getRaces, races } = useContext(RacesContext)
  const [selectedRace, setSelectedRace] = useState({})
  const currentUser = parseInt(localStorage.getItem("app_user_id"))

  console.log("races", races)
  console.log("slectedRace", selectedRace)

  useEffect(() => {
    getRaces()
  }, [])

  // sets selectedRace to the current race.

  useEffect(() => {
    setSelectedRace(currentRaceFinder())
  }, [races])

  //

  const currentRaceFinder = () => {
    const racesForUser = races.filter((race) => race.userId === currentUser)
    const currentRace = racesForUser.sort((a, b) => a.date - b.date)[0]
    console.log(currentRace)
    return currentRace
  }
  return (
    <>
      <button onClick={() => props.history.push("/raceform")}>Form</button>
      <button
        onClick={() => {
          localStorage.setItem("current_race", selectedRace.id)
          props.history.push({ pathname: "/workout", state: { currentRace: selectedRace } })
        }}
      >
        Race
      </button>
    </>
  )
}

// To add later
// .find((race) => !race.isComplete) || {}
