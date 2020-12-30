import React from "react"
import { Box, Card, Text, Grommet, Heading } from "grommet"
import { theme } from "../../theme"

export const RaceResult = ({ race, raceResult }) => {
  console.log(raceResult)
  const day = 86400000

  return (
    <Grommet theme={theme}>
      <Box pad="medium" align="center" margin="none">
        <Card
          pad="none"
          gap="xxsmall"
          background="light-5"
          elevation="large"
          // border={{ size: "small", color: "black" }}
        >
          <Heading level="3" alignSelf="center" margin="xsmall" gap="small">
            {raceResult.name}
          </Heading>
          <Text alignSelf="center">{new Date(raceResult.date).toDateString()}</Text>{" "}
          <Box direction="row" alignSelf="center">
            {/* Left */}
            <Box direction="column" pad="small">
              {/* Race Time */}
              <Box
                border={{ size: "medium", color: "black" }}
                round={{ "rounding": 12 }}
                margin="small"
                width="auto"
              >
                <Text margin="small">Race Time: {raceResult.raceTime} min</Text>
              </Box>
              {/* Distance */}
              <Box
                border={{ size: "medium", color: "black" }}
                round={{ "rounding": 12 }}
                margin="small"
              >
                <Text margin="small">Distance: {raceResult.distance} miles</Text>
              </Box>
              {/* City */}
              <Box
                border={{ size: "medium", color: "black" }}
                round={{ "rounding": 12 }}
                margin="small"
              >
                <Text margin="small">City: {raceResult.city}</Text>
              </Box>
            </Box>
            {/* Right */}
            <Box direction="column" pad="small">
              {/* Time Goal */}
              <Box
                border={{ size: "medium", color: "black" }}
                round={{ "rounding": 12 }}
                margin="small"
              >
                <Text margin="small">Time Goal: {raceResult.goalRaceTime} min</Text>
              </Box>
              {/* Position */}
              <Box
                border={{ size: "medium", color: "black" }}
                round={{ "rounding": 12 }}
                margin="small"
              >
                <Text margin="small">Finishing Place: {raceResult.position}</Text>
              </Box>
              {/* State */}
              <Box
                border={{ size: "medium", color: "black" }}
                round={{ "rounding": 12 }}
                margin="small"
              >
                <Text margin="small">State: {raceResult.state}</Text>
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>
    </Grommet>
  )
}
