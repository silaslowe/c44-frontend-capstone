import React, { useContext, useEffect, useState } from "react"
import { RacesContext, RacesProvider } from "../races/RacesProvider"
import { Route, Redirect } from "react-router-dom"
import { WorkoutProvider } from "../workouts/WorkoutProvider"
import { RaceDisplay } from "../races/RaceDisplay"
import { WorkoutGenerator } from "../workouts/WorkoutGenerator"
import { RaceForm } from "../races/RaceForm"

export const Home = (props) => {
  const { getRaces, races } = useContext(RacesContext)
  const currentUser = parseInt(localStorage.getItem("app_user_id"))
  const [selectedRace, setSelectedRace] = useState({})

  useEffect(() => {
    getRaces()
  }, [])

  const currentRace = () => {
    const racesForUser = races.filter((race) => race.userId === currentUser)
    const currentRace = racesForUser.find((race) => !race.isComplete) || {}
    return currentRace
  }
  useEffect(() => {
    setSelectedRace(currentRace())
  }, [races])

  // get all. filter by user, find race with completed as false. If no race>>>start new race, if yes>>>show race

  return (
    <>
      {!selectedRace.id ? (
        <RaceForm {...props} />
      ) : !selectedRace.startDistPercent ? (
        <>
          <RaceDisplay {...props} selectedRace={selectedRace} />
          <WorkoutGenerator {...props} selectedRace={selectedRace} />
        </>
      ) : (
        <>
          <h1></h1>
        </>
      )}
    </>
  )
}
