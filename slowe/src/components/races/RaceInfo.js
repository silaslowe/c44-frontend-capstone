import React, { useEffect, useContext, useState } from "react"
import { RacesContext } from "../races/RacesProvider"
import { currentRaceFinder } from "../helper"
import { Grommet, Box, Card, Text, Heading } from "grommet"
import { theme } from "../../theme"

export const RaceInfo = () => {
  const { races, getRaces } = useContext(RacesContext)
  const currentUser = parseInt(localStorage.getItem("app_user_id"))
  const [currentRace, setCurrentRace] = useState({})
  const day = 86400000

  useEffect(() => {
    getRaces()
  }, [])

  // Finds the most recent race for the user and sets the selectedRace state to be passed in state during the navigation
  useEffect(() => {
    setCurrentRace(currentRaceFinder(races, currentUser) || {})
  }, [races])
  return (
    <Grommet theme={theme}>
      <Box pad="medium" align="center">
        <Card
          pad="small"
          gap="medium"
          background="light-5"
          elevation="large"
          border={{ size: "small", color: "black" }}
        >
          <Heading level="3" alignSelf="center" margin="xsmall" gap="small">
            Race Name: {currentRace.name}
          </Heading>
          <Text alignSelf="center">{new Date(currentRace.date + day).toDateString()}</Text>
          <Box direction="row">
            <Box direction="column" pad="small">
              <Box
                border={{ size: "small", color: "black" }}
                round={{ "rounding": 12 }}
                margin="small"
              >
                <Text margin="small">Distance: {currentRace.distance} miles</Text>
              </Box>
              <Box border={{ size: "small", color: "black" }} round={{ "rounding": 12 }}>
                <Text margin="small">City :{currentRace.city}</Text>
              </Box>
            </Box>
            <Box direction="column" pad="small">
              <Text margin="small">Time Goal: {currentRace.goalRaceTime} min</Text>
              <Text margin="small">State: {currentRace.state}</Text>
            </Box>
          </Box>
        </Card>
      </Box>
    </Grommet>
  )
}
