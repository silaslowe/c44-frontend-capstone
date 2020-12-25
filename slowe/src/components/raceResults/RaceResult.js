import React, { useContext, useRef, useState } from "react"
import { RaceResultContext } from "./RaceResultsProvider"
import { Grommet, Box, Button, TextInput, Heading, RadioButtonGroup, TextArea, Grid } from "grommet"
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
      <Box alignContent="center" margin="large">
        <Box pad="medium" alignSelf="center" margin="medium" elevation="large" width="large">
          <Heading level="3" alignSelf="center" margin="small">
            Race Results
          </Heading>
          <Heading level="5" alignSelf="center" margin="xxsmall">
            {new Date(currentRaceResult.date + day).toDateString()}
          </Heading>
          <Box align="center" alignContent="center">
            <Grid
              rows={["auto", "auto"]}
              columns={["1/3", "1/3", "1/3"]}
              areas={[
                ["completed", "raceTime", "position"],
                ["notes", "notes", "notes"],
              ]}
            >
              {/* Race Time */}
              <Box gridArea="raceTime">
                <Heading level="4" margin="small">
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
              </Box>
              {/* Race Position */}
              <Box gridArea="position">
                <Heading level="4" margin="small">
                  Position:
                </Heading>
                <Box margin="small">
                  <TextInput
                    type="text"
                    name="position"
                    value={raceResults.position || ""}
                    onChange={handleChange}
                  />
                </Box>
              </Box>
              {/* Completed */}
              <Box gridArea="completed">
                <Heading level="4" margin="small" alignSelf="start">
                  Competed:
                </Heading>
                <Box margin="small" alignContent="center">
                  <RadioButtonGroup
                    name="competed"
                    options={["True", "False"]}
                    value={raceResults.completed}
                    onChange={handleChange}
                  />
                </Box>
              </Box>
              {/* Notes */}
              <Box gridArea="notes">
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
              </Box>
            </Grid>
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
        </Box>
      </Box>
    </Grommet>
  )
}
