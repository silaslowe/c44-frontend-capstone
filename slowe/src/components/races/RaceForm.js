import React, { useContext, useRef, useEffect } from "react"
import { RacesContext } from "./RacesProvider"

export const RaceForm = (props) => {
  const { addRace } = useContext(RacesContext)
  const currentUser = parseInt(localStorage.getItem("app_user_id"))
  let currentRace = ""

  const name = useRef(null)
  const state = useRef(null)
  const city = useRef(null)
  const raceDate = useRef(null)
  const raceTotalDistance = useRef(null)
  const startDate = Date.now()
  const startDistPercent = useRef(null)
  const startPacePercent = useRef(null)
  const goalRaceTime = useRef(null)
  const unit = useRef(null)

  const constructNewRace = () => {
    const raceTotalDistanceInt = parseFloat(raceTotalDistance.current.value)
    // const dateToMilli = Date.parse(raceDate)
    const raceDateToMilli = Date.parse(raceDate.current.value)
    const userId = parseInt(localStorage.getItem("app_user_id"))
    let distUnit = parseFloat(raceTotalDistance.current.value)
    if (unit.current.value === "kilos") {
      distUnit = parseFloat(raceTotalDistance.current.value) * 0.62
    }
    console.log(unit)
    console.log(distUnit)

    if (
      city === "" ||
      state === "0" ||
      raceDate === "" ||
      raceTotalDistanceInt === "" ||
      name === "" ||
      unit === ""
    ) {
      window.alert("Please fill out form")
    } else {
      addRace({
        name: name.current.value,
        state: state.current.value,
        city: city.current.value,
        date: raceDateToMilli,
        distance: parseFloat(distUnit),
        startDate: startDate,
        userId: userId,
        startDistPercent: parseFloat(startDistPercent.current.value),
        goalRaceTime: parseInt(goalRaceTime.current.value),
        startPacePercent: parseFloat(startPacePercent.current.value),
        isComplete: false,
      })
    }
  }

  return (
    <form className="raceForm">
      <h2 className="raceForm__title">New Race</h2>
      {/* Name */}
      <fieldset>
        <div className="form-group">
          <label htmlFor="RaceName">Race Name: </label>
          <input
            type="text"
            id="raceName"
            ref={name}
            required
            autoFocus
            className="form-control"
            placeholder="Race Name"
          />
        </div>
      </fieldset>
      {/* State */}
      <fieldset>
        <div className="form-group">
          <label htmlFor="raceState">State</label>
          <select
            defaultValue=""
            name="raceState"
            ref={state}
            id="raceState"
            className="form-control"
          >
            <option value="0">Select a State</option>
            <option value="AK">Alaska</option>
            <option value="AL">Albama</option>
          </select>
        </div>
      </fieldset>
      {/* City */}
      <fieldset>
        <div className="form-group">
          <label htmlFor="raceCity ">City</label>
          <input
            type="text"
            id="raceCity"
            ref={city}
            required
            className="form-control"
            placeholder="Race City"
          />
        </div>
      </fieldset>
      {/* Unit  */}
      <fieldset>
        <div className="form-group">
          <label htmlFor="unit">Unit</label>
          <select defaultValue="0" name="unit" ref={unit} id="unit" className="form-control">
            <option value="0">Select a Unit</option>
            <option value="miles">Miles</option>
            <option value="kilos">Kilometers</option>
          </select>
        </div>
      </fieldset>
      {/* Distance */}
      <fieldset>
        <div className="form-group">
          <label htmlFor="raceDistance ">Distance</label>
          <input
            type="text"
            id="raceDistance"
            ref={raceTotalDistance}
            required
            className="form-control"
            placeholder="0"
          />
        </div>
      </fieldset>

      {/* Date */}
      <fieldset>
        <div className="form-group">
          <label htmlFor="raceDate">Date</label>
          <input type="date" id="raceDate" ref={raceDate} required className="form-control" />
        </div>
      </fieldset>
      <h2 className="parametersForm__title">Race Parameters</h2>
      {/* Starting Distance */}
      <fieldset>
        <div className="form-group">
          <label htmlFor="raceDistPercent">Starting Dist Percent</label>
          <select
            defaultValue=""
            name="startDistPercent"
            ref={startDistPercent}
            id="startDistPercent"
            className="form-control"
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
            id="goalRaceTime"
            ref={goalRaceTime}
            className="form-control"
            placeholder="Goal Time in Minutes"
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
            ref={startPacePercent}
            id="startPacePercent"
            className="form-control"
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
      {/* Submit */}
      <button
        type="submit"
        onClick={(ev) => {
          ev.preventDefault()
          constructNewRace()
          props.history.push("/")
        }}
        className="btn btn-primary"
      >
        Save Race
      </button>
    </form>
  )
}
