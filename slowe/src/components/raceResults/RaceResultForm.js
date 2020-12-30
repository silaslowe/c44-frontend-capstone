import React, { useContext, useEffect, useState } from "react"
import { RaceResultContext } from "./RaceResultsProvider"
import { Grommet, Box, Button, TextInput, Heading, RadioButtonGroup, TextArea, Grid } from "grommet"
import { theme } from "../../theme"

export const RaceResultForm = (props) => {
  const [raceResults, setRaceResults] = useState({})
  const [completed, setCompleted] = useState("")
  const [beforeDate, setBeforeDate] = useState(true)
  const { addRaceResult } = useContext(RaceResultContext)
  const currentRaceResult = props.currentRace
  const day = 86400000
  let isCompleted = ""
  console.log(beforeDate)
  useEffect(() => {
    const currentDate = new Date()
    const currentDateMilli = currentDate.getTime()
    if (currentDateMilli > props.currentRace.date) {
      setBeforeDate(false)
    }
  }, [])
  const handleChange = (event) => {
    const newRaceResults = Object.assign({}, raceResults)
    newRaceResults[event.target.name] = event.target.value
    setRaceResults(newRaceResults)
  }

  const constructNewRaceResult = () => {
    if (completed === "True") {
      isCompleted = true
    } else {
      isCompleted = false
    }

    const raceTimeInt = parseInt(raceResults.raceTime)
    const positionInt = parseInt(raceResults.position)
    if (isNaN(raceTimeInt)) {
      window.alert("Please input a valid race time in minutes")
    } else if (isNaN(positionInt)) {
      window.alert("Please enter a valid finishing place")
    } else if (completed !== "True" && completed !== "False") {
      window.alert("Please fill out form")
    } else {
      addRaceResult({
        name: currentRaceResult.name,
        goalRaceTime: currentRaceResult.goalRaceTime,
        state: currentRaceResult.state,
        city: currentRaceResult.city,
        raceTime: raceTimeInt,
        position: positionInt,
        distance: props.currentRace.distance,
        date: props.currentRace.date,
        raceId: currentRaceResult.id,
        userId: localStorage.getItem("app_user_id"),
        completed: isCompleted,
      })
      props.history.push("/user")
    }
  }
  return (
    <Grommet theme={theme}>
      <Box alignContent="center" margin="medium">
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
                  Finish Place:
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
                    value={completed}
                    onChange={(option) => {
                      setCompleted(option.target.value)
                    }}
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
                    onChange={(value) => {
                      setCompleted(value)
                    }}
                    fill
                  />
                </Box>
              </Box>
            </Grid>
            <Button
              primary
              disabled={beforeDate}
              margin="small"
              label="Submit"
              onClick={(e) => {
                e.preventDefault()
                constructNewRaceResult()
              }}
            />
          </Box>
        </Box>
      </Box>
    </Grommet>
  )
}
