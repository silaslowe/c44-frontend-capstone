import React, { useContext, useEffect, useState } from "react"
import { RaceResultContext } from "./RaceResultsProvider"
import { RaceResult } from "./RaceResult"
import { Box, Grid, Grommet, Heading } from "grommet"
import { theme } from "../../theme"

export const RaceResultList = (props) => {
  const { getRaceResults, raceResults } = useContext(RaceResultContext)
  const [currentUserResults, setCurrentUserResults] = useState([])

  useEffect(() => {
    getRaceResults()
  }, [])

  useEffect(() => {
    setCurrentUserResults(
      raceResults.filter((race) => {
        return race.userId === parseInt(localStorage.getItem("app_user_id"))
      })
    )
  }, [raceResults])
  return (
    <Grommet theme={theme}>
      <Box align="center">
        <Heading margin="small">RaceResults</Heading>
        <Box direction="column">
          {currentUserResults.map((result) => {
            return <RaceResult key={result.id} {...props} raceResult={result} />
          })}
        </Box>
      </Box>
    </Grommet>
  )
}
