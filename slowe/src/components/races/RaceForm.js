import React, { useContext, useState, useEffect } from "react"
import { StateContext } from "./StateProvider"
import { RacesContext } from "./RacesProvider"
import {
  Box,
  Button,
  DateInput,
  Grid,
  Grommet,
  Heading,
  RadioButtonGroup,
  Select,
  TextInput,
} from "grommet"
import { theme } from "../../theme"

export const RaceForm = (props) => {
  const { addRace } = useContext(RacesContext)
  const { getStates, states } = useContext(StateContext)
  const [newRace, setNewRace] = useState({})
  const [newDate, setNewDate] = useState("")
  const [units, setUnits] = useState("")
  const [raceState, setRaceState] = useState("")
  const [startDistPercent, setstartDistPercent] = useState("")
  const [startPacePercent, setstartPacePercent] = useState("")
  const startDate = Date.now()
  let distUnit = ""

  const ranges = [
    { value: 0.5, display: "50%" },
    { value: 0.55, display: "55%" },
    { value: 0.6, display: "60%" },
    { value: 0.65, display: "65%" },
    { value: 0.7, display: "70%" },
    { value: 0.75, display: "75%" },
    { value: 0.8, display: "80%" },
  ]

  useEffect(() => {
    getStates()
  }, [])

  const handleChange = (event) => {
    const newRaceObj = Object.assign({}, newRace)
    newRaceObj[event.target.name] = event.target.value
    setNewRace(newRaceObj)
  }

  const createNewRace = () => {
    const user = parseInt(localStorage.getItem("app_user_id"))
    const raceDateToMilli = Date.parse(newDate)

    if (units === "Kilometers") {
      distUnit = (parseFloat(newRace.distance) * 0.62).toFixed(2)
    } else {
      distUnit = newRace.distance
    }

    addRace({
      name: newRace.name,
      state: raceState,
      city: newRace.city,
      date: newDate,
      distance: parseFloat(distUnit),
      startDate: startDate,
      userId: user,
      startDistPercent,
      startPacePercent,
      goalRaceTime: parseInt(newRace.goalRaceTime),
      isCompete: false,
    })
  }

  return (
    <>
      <Grommet theme={theme}>
        <Box alignContent="center" margin="large">
          <Box pad="medium" alignSelf="center" margin="medium" elevation="large" width="large">
            <Heading level="4" alignSelf="center" margin="small">
              Create New Race
            </Heading>
            <Grid
              rows={["auto", "auto"]}
              columns={["1/2", "1/2"]}
              areas={[
                ["name", "date"],
                ["units", "distance"],
                ["city", "raceState"],
              ]}
            >
              {/* Name */}
              <Box gridArea="name">
                <Heading level="5" margin="small">
                  Race Name:
                </Heading>
                <Box margin="small">
                  <TextInput
                    type="text"
                    name="name"
                    value={newRace.name || ""}
                    onChange={handleChange}
                  />
                </Box>
              </Box>
              {/* Date */}
              <Box gridArea="date">
                <Heading level="5" margin="small">
                  Race Date:
                </Heading>
                <Box margin="small">
                  <DateInput
                    format="mm/dd/yyyy"
                    name="date"
                    value={new Date().toISOString()}
                    onChange={({ value }) => {
                      setNewDate(Date.parse(value))
                    }}
                  />
                </Box>
              </Box>
              {/* Unit */}
              <Box gridArea="units">
                <Heading level="5" margin="small" alignSelf="start">
                  Units will be converted to miles:
                </Heading>
                <Box margin="small" alignContent="center">
                  <RadioButtonGroup
                    name="units"
                    options={["Miles", "Kilometers"]}
                    value={units}
                    onChange={(e) => setUnits(e.target.value)}
                  />
                </Box>
              </Box>
              {/* Distance */}
              <Box gridArea="distance">
                <Heading level="5" margin="small">
                  Race Distance:
                </Heading>
                <Box margin="small">
                  <TextInput
                    type="text"
                    name="distance"
                    value={newRace.distance || ""}
                    onChange={handleChange}
                  />
                </Box>
              </Box>
              {/* City */}
              <Box gridArea="city">
                <Heading level="5" margin="small">
                  City:
                </Heading>
                <Box margin="small">
                  <TextInput
                    type="text"
                    name="city"
                    value={newRace.city || ""}
                    onChange={handleChange}
                  />
                </Box>
              </Box>
              {/* State */}
              <Box gridArea="raceState">
                <Heading level="5" margin="small">
                  State:
                </Heading>
                <Box margin="small">
                  <Select
                    name="state"
                    options={states.map((state) => state.name)}
                    value={raceState}
                    onChange={(option) => {
                      setRaceState(option.value)
                    }}
                  />
                </Box>
              </Box>
            </Grid>
            <Heading level="4" alignSelf="center" margin="small">
              Parameters
            </Heading>
            <Heading level="5" alignSelf="center" margin={{ bottom: "medium", top: "none" }}>
              {" "}
              Set starting difficulty of workouts
            </Heading>
            <Grid
              rows={["auto", "auto"]}
              columns={["1/2", "1/2"]}
              areas={[
                ["goalRaceTime", "goalRaceTime"],
                ["startingDist", "startingSpeed"],
              ]}
            >
              {/* Sarting Distance */}
              <Box gridArea="startingDist">
                <Heading level="5" margin="small">
                  Percent of total distance to start:
                </Heading>
                <Box margin="small">
                  <Select
                    name="startingDistance"
                    options={ranges.map((percent) => percent.display)}
                    value={ranges.value}
                    onChange={(range) => {
                      setstartDistPercent(ranges.find((r) => r.display === range.value).value)
                    }}
                  />
                </Box>
              </Box>
              {/* Sarting Speed */}
              <Box gridArea="startingSpeed">
                <Heading level="5" margin="small">
                  Percent of goal speed to start:
                </Heading>
                <Box margin="small">
                  <Select
                    name="startingSpeed"
                    options={ranges.map((percent) => percent.display)}
                    value={ranges.value}
                    onChange={(range) => {
                      setstartPacePercent(ranges.find((r) => r.display === range.value).value)
                    }}
                  />
                </Box>
              </Box>
              {/* Goal Race Time */}
              <Box gridArea="goalRaceTime">
                <Heading level="5" margin="small" alignSelf="center">
                  Goal Race Time in Minutes:
                </Heading>
                <Box margin="small" width="medium" alignSelf="center">
                  <TextInput
                    type="text"
                    name="goalRaceTime"
                    value={newRace.goalRaceTime || ""}
                    onChange={handleChange}
                  />
                </Box>
              </Box>
            </Grid>
            <Button
              primary
              width="small"
              label="Submit"
              onClick={(e) => {
                e.preventDefault()
                createNewRace()
                props.history.push("/")
              }}
            />
          </Box>
        </Box>
      </Grommet>
    </>
  )
}
