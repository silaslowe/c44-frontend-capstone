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
      raceResults.filter((race) => race.userId === localStorage.getItem("app_user_id"))
    )
  }, [])
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
          {raceResults.map((result) => {
            return <RaceResult key={result.id} {...props} raceResult={result} />
          })}
        </Grid>
      </Box>
    </Grommet>
  )
}
