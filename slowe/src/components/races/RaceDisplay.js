import React, { useContext, useEffect, useRef, useState } from "react"
import { RacesContext } from "../races/RacesProvider"

export const RaceDisplay = (props) => {
  const { getSelectedRace, editRace } = useContext(RacesContext)
  const [race, setRace] = useState({})

  const handleControlledInputChange = (e) => {
    /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
    const newRace = Object.assign({}, race)
    newRace[e.target.name] = e.target.value
    setRace(newRace)
  }

  const id = props.selectedRace.id
  const name = props.selectedRace.sname
  const city = props.selectedRace.city
  const state = props.selectedRace.state
  const distance = props.selectedRace.distance
  const date = props.selectedRace.date
  const raceDate = new Date(date).toDateString()
  const userId = props.selectedRace.suserId
  const startDate = props.selectedRace.startDate

  return (
    <>
      <div className="race-box">
        <h3>Name: {props.selectedRace.name}</h3>
        <p>Distance: {props.selectedRace.distance} miles</p>
        <p>City :{props.selectedRace.city}</p>
        <p>State: {props.selectedRace.state}</p>
        <p>Date: {raceDate}</p>
      </div>
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
        <button
          type="submit"
          onClick={(ev) => {
            ev.preventDefault()
            editRace({
              name,
              city,
              state,
              distance,
              date,
              raceDate,
              userId,
              startDate,
              id,
              startDistPercent: parseFloat(race.startDistPercent),
              goalRaceTime: parseInt(race.goalRaceTime),
              startPacePercent: parseFloat(race.startPacePercent),
            })
            props.history.push("/workout-display")
            localStorage.setItem("current_race", id)
          }}
          className="btn btn-primary"
        >
          Save Race
        </button>
      </form>
    </>
  )
}
