import React, { useContext, useEffect, useRef, useState } from "react"
import { RacesContext } from "./RacesProvider"
import { WorkoutContext } from "../workouts/WorkoutProvider"

export const SetParameters = (props) => {
  const { editRace, races } = useContext(RacesContext)
  const { getWorkoutsByRace, workouts } = useContext(WorkoutContext)
  const [race, setRace] = useState({})
  let currentRace = props.location.state.currentRace
  let workoutLength = workouts.length

  console.log("SP", props)

  useEffect(() => {
    getWorkoutsByRace()
  }, [races])

  // Handles the inputs as the are updated
  const handleControlledInputChange = (e) => {
    const newRace = Object.assign({}, race)
    newRace[e.target.name] = e.target.value
    setRace(newRace)
  }
  // Variable to define the race object
  let name = currentRace.name
  let city = currentRace.city
  let state = currentRace.state
  let distance = currentRace.distance
  let date = currentRace.date
  let raceDate = new Date(date).toDateString()
  let userId = currentRace.suserId
  let startDate = currentRace.startDate
  return (
    <>
      <form className="paramtersForm">
        <h2 className="parametersForm__title">Race Parameters</h2>
        {/* Starting Distance */}
        <fieldset>
          <div className="form-group">
            <label htmlFor="raceDistPercent">Starting Dist Percent</label>
            <select
              name="startDistPercent"
              className="form-control"
              value={race.startDistPercent}
              onChange={handleControlledInputChange}
            >
              <option value="0">Select Dist Percent</option>
              <option value=".5">50%</option>
              <option value=".55">55%</option>
              <option value=".6">60%</option>
              <option value=".65">65%</option>
              <option value=".7">70%</option>
              <option value=".75">75%</option>
              <option value=".8">80%</option>
            </select>
          </div>
        </fieldset>
        {/* Goal Race Time */}
        <fieldset>
          <div className="form-group">
            <label htmlFor="goalRaceTime ">Time Goal</label>
            <input
              type="text"
              name="goalRaceTime"
              required
              className="form-control"
              value={race.goalRaceTime || ""}
              placeholder="Minutes to Complete Race"
              onChange={handleControlledInputChange}
            />
          </div>
        </fieldset>
        {/* Starting Speed */}
        <fieldset>
          <div className="form-group">
            <label htmlFor="startPacePercent">Select Speed Percent</label>
            <select
              defaultValue=""
              name="startPacePercent"
              value={race.startPacePercent}
              id="raceState"
              className="form-control"
              onChange={handleControlledInputChange}
            >
              <option value="0">Select Starting Speed</option>
              <option value=".5">50%</option>
              <option value=".55">55%</option>
              <option value=".6">60%</option>
              <option value=".65">65%</option>
              <option value=".7">70%</option>
              <option value=".75">75%</option>
              <option value=".8">80%</option>
            </select>
          </div>
        </fieldset>
        {/* Adds the parameters to the race object */}
        <button
          type="submit"
          onClick={(ev) => {
            ev.preventDefault()
            if (race.startDistPercent && race.goalRaceTime && race.startPacePercent) {
              editRace({
                name,
                city,
                state,
                distance,
                date,
                raceDate,
                userId,
                id: currentRace.id,
                startDate,
                startDistPercent: parseFloat(race.startDistPercent),
                goalRaceTime: parseInt(race.goalRaceTime),
                startPacePercent: parseFloat(race.startPacePercent),
              })
              // Creates an unpdated version of the object to pass with state to the next component
              const updatedCurrentRace = {
                name,
                city,
                state,
                distance,
                date,
                raceDate,
                userId,
                startDate,
                id: currentRace.id,
                startDistPercent: parseFloat(race.startDistPercent),
                goalRaceTime: parseInt(race.goalRaceTime),
                startPacePercent: parseFloat(race.startPacePercent),
              }
              // navigates to the main page with the generated workouts. Includes data in state
              props.history.push({
                pathname: "/workout-display",
                state: { currentRace: updatedCurrentRace },
              })
            } else {
              window.alert("Please set parameters")
            }
          }}
          className="btn btn-primary"
        >
          Save Race
        </button>
      </form>
    </>
  )
}
