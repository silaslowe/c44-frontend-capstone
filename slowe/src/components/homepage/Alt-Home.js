import React, { useContext, useEffect, useState } from "react"
import { RacesContext, RacesProvider } from "../races/RacesProvider"
import { Route, Redirect } from "react-router-dom"
import { WorkoutProvider } from "../workouts/WorkoutProvider"
import { RaceDisplay } from "../races/RaceDisplay"
import { WorkoutGenerator } from "../workouts/WorkoutGenerator"
import { RaceForm } from "../races/RaceForm"

export const AltHome = (props) => {
  const { getRaces, races } = useContext(RacesContext)
  const currentUser = parseInt(localStorage.getItem("app_user_id"))
  const [selectedRace, setSelectedRace] = useState({})

  console.log("althome", props)

  useEffect(() => {
    getRaces()
  }, [])

  const currentRace = () => {
    const racesForUser = races.filter((race) => race.userId === currentUser)
    const currentRace = racesForUser.sort((a, b) => a.date - b.date)[0]
    console.log(currentRace)
    return currentRace
  }
  useEffect(() => {
    setSelectedRace(currentRace())
  }, [races])
  return (
    <>
      <button onClick={() => props.history.push("/raceform")}>Form</button>
      <button onClick={() => props.history.push("/workout")}>Race</button>
    </>
  )
}

// To add later
// .find((race) => !race.isComplete) || {}
