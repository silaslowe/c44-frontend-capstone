import React, { useContext, useRef, useEffect, useState } from "react"
import { RacesContext } from "./RacesProvider"

export const RaceForm = (props) => {
  const { addRace, getRaces, races } = useContext(RacesContext)
  const [lastRace, setLastRace] = useState("")

  useEffect(() => {
    getRaces()
  }, [])

  const sortRaces = () => {
    const sortedRaces = races.sort((a, b) => b.startDate - a.startDate)
    return sortedRaces[0]
  }
  useEffect(() => {
    setLastRace(sortRaces())
  })
  const name = useRef(null)
  const state = useRef(null)
  const city = useRef(null)
  const raceDate = useRef(null)
  const raceTotalDistance = useRef(null)
  const startDate = Date.now()

  const constructNewRace = () => {
    const raceTotalDistanceInt = parseFloat(raceTotalDistance.current.value)
    // const dateToMilli = Date.parse(raceDate)
    const raceDateToMilli = Date.parse(raceDate.current.value)
    const userId = parseInt(localStorage.app_user_id)

    if (
      city === "" ||
      state === "0" ||
      raceDate === "" ||
      raceTotalDistanceInt === "" ||
      name === ""
    ) {
      window.alert("Please fill out form")
    } else {
      addRace({
        name: name.current.value,
        state: state.current.value,
        city: city.current.value,
        date: raceDateToMilli,
        distance: raceTotalDistanceInt,
        startDate: startDate,
        userId: userId,
        startDistPercent: "",
        goalRaceTime: "",
        startPacePercent: "",
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
      {/* Submit */}
      <button
        type="submit"
        onClick={(ev) => {
          ev.preventDefault()
          constructNewRace()
          localStorage.setItem("current_race", lastRace.id + 1)
          props.history.push("/workout")
        }}
        className="btn btn-primary"
      >
        Save Race
      </button>
    </form>
  )
}
