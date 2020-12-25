import React, { useContext, useEffect, useState } from "react"
import { RacesContext } from "../races/RacesProvider"
import { RaceInfo } from "../races/RaceInfo"
import { WorkoutGenerator } from "../workouts/WorkoutGenerator"
import { RaceForm } from "../races/RaceForm"
import { WorkoutContext } from "../workouts/WorkoutProvider"
import { WorkoutList } from "../workouts/WorkoutList"
import { currentRaceFinder } from "../helper"

export const Home = (props) => {
  const { getRaces, races } = useContext(RacesContext)
  const { workouts, getWorkouts } = useContext(WorkoutContext)
  const [currentRace, setCurrentRace] = useState({})
  const [currentWorkouts, setCurrentWorkouts] = useState([])
  const currentUser = parseInt(localStorage.getItem("app_user_id"))

  useEffect(() => {
    getRaces()
  }, [])

  // Finds the most recent race for the user and sets the selectedRace state to be passed in state during the navigation
  useEffect(() => {
    setCurrentRace(currentRaceFinder(races, currentUser) || {})
  }, [races])

  useEffect(() => {
    getWorkouts()
  }, [races, currentRace])
  // This is supposed to get the workouts for the selected race to be passed in state during navigation. The logic works but the fetch rarely does.
  useEffect(() => {
    setCurrentWorkouts(workouts.filter((workout) => workout.raceId === currentRace.id))
  }, [currentRace, races])

  useEffect(() => {
    setCurrentWorkouts(workouts.filter((workout) => workout.raceId === currentRace.id))
  }, [])

  useEffect(() => {
    localStorage.setItem("current_race", currentRace.id)
  }, [currentRace])

  return (
    <>
      {currentRace.id && currentWorkouts.length !== 0 ? (
        <>
          <RaceInfo {...props} currentRace={currentRace} currentWorkouts={currentWorkouts} />
          <WorkoutList {...props} currentRace={currentRace} currentWorkouts={currentWorkouts} />
        </>
      ) : currentRace.id ? (
        <>
          <RaceInfo {...props} currentRace={currentRace} currentWorkouts={currentWorkouts} />
          <WorkoutGenerator
            {...props}
            currentRace={currentRace}
            currentWorkouts={currentWorkouts}
          />
        </>
      ) : (
        <>
          <RaceForm {...props} />
        </>
      )}
    </>
  )
}
