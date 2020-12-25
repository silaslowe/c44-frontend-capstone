import React, { useContext, useRef, useState } from "react"
import { RaceResultContext } from "./RaceResultsProvider"
import { Grommet, Box, Button, TextInput, Heading, RadioButtonGroup, TextArea } from "grommet"
import { theme } from "../../theme"

export const RaceResult = (props) => {
  const [raceResults, setRaceResults] = useState({})
  const { addRaceResult } = useContext(RaceResultContext)
  const currentRaceResult = props.currentRace
  const day = 86400000
  let isCompleted = ""
  if (raceResults.completed === "true") {
    isCompleted = true
  } else {
    isCompleted = false
  }

  const handleChange = (event) => {
    const newRaceResults = Object.assign({}, raceResults)
    newRaceResults[event.target.name] = event.target.value
    setRaceResults(newRaceResults)
  }

  const constructNewRaceResult = () => {
    const raceTimeInt = parseInt(raceResults.raceTime)
    const positionInt = parseInt(raceResults.position)

    if (raceResults.raceTime === "" || raceResults.position === "") {
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

  console.log(raceResults)
  return (
    <Grommet theme={theme}>
      <Heading level="3" alignSelf="center">
        Race Results
      </Heading>
      <Heading level="4" alignSelf="center">
        {new Date(currentRaceResult.date + day).toDateString()}
      </Heading>
      <Box align="center" alignContent="center">
        {/* Race Time */}
        <Heading level="4" margin={{ "top": "large", "bottom": "none" }}>
          Race Time:
        </Heading>
        <Box margin="small">
          <TextInput
            type="text"
            name="raceTime"
            value={raceResults.raceTime || ""}
            onChange={handleChange}
          />
        </Box>
        {/* Race Position */}
        <Heading level="4" margin="small">
          Race Position
        </Heading>
        <Box margin="small">
          <TextInput
            type="text"
            name="position"
            value={raceResults.position || ""}
            onChange={handleChange}
          />
        </Box>
        {/* Completed */}
        <Heading level="4" margin="small">
          Race Competed:
        </Heading>
        <Box margin="small">
          <RadioButtonGroup
            name="competed"
            options={["True", "False"]}
            value={raceResults.completed}
            onChange={handleChange}
          />
        </Box>
        {/* Notes */}
        <Heading level="4" margin="small">
          Notes:
        </Heading>
        <Box width="mdeium" height="small">
          <TextArea
            name="notes"
            placeholder="Enter notes here..."
            value={raceResults.notes}
            onChange={handleChange}
            fill
          />
        </Box>
        <Button
          primary
          label="Submit"
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
