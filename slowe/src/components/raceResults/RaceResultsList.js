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
        console.log(race)
        return race.userId === parseInt(localStorage.getItem("app_user_id"))
      })
    )
  }, [raceResults])
  console.log(currentUserResults)
  return (
    <Grommet theme={theme}>
      <Box align="center">
        <Heading margin="small">RaceResults</Heading>
        <Grid
          columns={{
            count: 2,
            size: "auto",
          }}
          gap="small"
        >
          {currentUserResults.map((result) => {
            return <RaceResult key={result.id} {...props} raceResult={result} />
          })}
        </Grid>
      </Box>
    </Grommet>
  )
}
