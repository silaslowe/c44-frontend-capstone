import React, { useContext, useRef } from "react"
import { RaceResultContext } from "./RaceResultsProvider"
import { Grommet, Box, Button, Text, Heading } from "grommet"
import { theme } from "../../theme"

export const RaceResult = (props) => {
  const { addRaceResult } = useContext(RaceResultContext)
  const currentRaceResult = props.currentRace
  const day = 86400000

  const raceTime = useRef(null)
  const position = useRef(null)
  const completed = useRef(null)
  const note = useRef(null)

  const constructNewRaceResult = () => {
    const raceTimeInt = parseInt(raceTime.current.value)
    const positionInt = parseInt(position.current.value)

    console.log(raceTimeInt)
    console.log(raceTime)
    console.log(currentRaceResult.distance)
    let isCompleted = ""
    if (completed.current.value === "true") {
      isCompleted = true
    } else {
      isCompleted = false
    }

    if (raceTime === "" || position === "" || completed === "0") {
      window.alert("Please fill out form")
    } else {
      addRaceResult({
        name: currentRaceResult.name,
        distance: currentRaceResult.distacnce,
        goalRaceTime: currentRaceResult.goalRaceTime,
        state: currentRaceResult.state,
        city: currentRaceResult.city,
        raceTime: raceTimeInt,
        position: positionInt,
        raceId: currentRaceResult.id,
        completed: isCompleted,
      })
    }
  }
  return (
    <Grommet theme={theme}>
      <Box fill align="center" justify="center">
        <Heading level="3" margin={{ "top": "large", "bottom": "none" }}>
          Race Result
        </Heading>
        <Heading level="5" margin={{ "top": "small", "bottom": "small" }}>
          {new Date(currentRaceResult.date + day).toDateString()}
        </Heading>
        {/* Time */}
        <fieldset>
          <div className="form-group">
            <label htmlFor="raceTime">Race Time: </label>
            <input
              type="number"
              id="raceName"
              ref={raceTime}
              required
              autoFocus
              className="form-control"
              placeholder="Race Time In Minutes"
            />
          </div>
        </fieldset>
        {/* Posiiton */}
        <fieldset>
          <div className="form-group">
            <label htmlFor="Position">Position: </label>
            <input
              type="number"
              id="position"
              ref={position}
              required
              className="form-control"
              placeholder="Finishing Position"
            />
          </div>
        </fieldset>
        {/* Completed */}
        <fieldset>
          <div className="form-group">
            <label htmlFor="raceDistPercent">Completed?</label>
            <select
              defaultValue=""
              name="startDistPercent"
              ref={completed}
              id="startDistPercent"
              className="form-control"
            >
              <option value="0">Did you finish?</option>
              <option value="true">Yes</option>
              <option value="falsen">No</option>
            </select>
          </div>
        </fieldset>
        {/* Notes */}
        <fieldset>
          <div className="form-group">
            <label htmlFor="Position">Notes: </label>
            <textarea
              type="text"
              id="notes"
              ref={note}
              className="form-control"
              proptype="varchar"
              placeholder="Please enter notes or gentle musings here"
            />
          </div>
        </fieldset>
        <Button
          primary
          label="Race Result"
          onClick={(e) => {
            e.preventDefault()
            constructNewRaceResult()
            props.history.push("/user")
          }}
        />
      </Box>
    </Grommet>
  )
}
