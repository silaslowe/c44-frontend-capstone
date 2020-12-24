import React from "react"

import { Grommet, Box, Meter, Stack, Text } from "grommet"
import { theme } from "../../theme"

export const GoalsMetWorkoutsMeter = (props) => {
  const meterValue = props.goalsMetWo || 0

  return (
    <Grommet theme={theme}>
      <Box align="center" pad="large">
        <Box align="center">
          <Text>Workouts Goals Met</Text>
        </Box>
        <Stack anchor="center">
          <Meter
            type="circle"
            background="light-2"
            values={[{ value: meterValue }]}
            size="small"
            thickness="medium"
          />
          <Box direction="row" align="center" pad={{ bottom: "xsmall" }}>
            <Text size="xlarge" weight="bold">
              {meterValue}
            </Text>
            <Text size="small">%</Text>
          </Box>
        </Stack>
      </Box>
    </Grommet>
  )
}
