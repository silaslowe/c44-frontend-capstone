import React from "react"
import { Box, DataChart, Grommet, Text } from "grommet"
import { theme } from "../../theme"

export const SpeedGraph = (props) => {
  const data = props.speedArray
  return (
    <Grommet theme={theme}>
      <Box align="center" pad="large">
        <Box align="center">
          <Text margin={{ "top": "small", "bottom": "large" }}>MPH Over Time</Text>
        </Box>
        <DataChart
          data={data}
          series={["date", "speedMPH"]}
          chart={[
            { property: "speedMPH", type: "line", opacity: "medium", thickness: "xsmall" },
            { property: "speedMPH", type: "point", point: "circle", thickness: "medium" },
          ]}
          axis={{
            x: { property: "date", granularity: "medium" },
            y: { property: "speedMPH", granularity: "medium" },
          }}
          guide={{ x: { granularity: "fine" } }}
        />
      </Box>
    </Grommet>
  )
}
