import React from "react"
import { Box, DataChart, Grommet, Text } from "grommet"
import { theme } from "../../theme"

export const DistanceGraph = (props) => {
  const data = props.distanceArray
  console.log(data)
  return (
    <Grommet theme={theme}>
      <Box align="center" pad="large">
        <Box align="center">
          <Text>Miles Over Time</Text>
        </Box>
        <DataChart
          data={data}
          series={["date", "distance"]}
          chart={[
            { property: "distance", type: "line", opacity: "medium", thickness: "xsmall" },
            { property: "distance", type: "point", point: "circle", thickness: "medium" },
          ]}
          axis={{
            x: { property: "date", granularity: "medium" },
            y: { property: "distance", granularity: "medium" },
          }}
          guide={{ x: { granularity: "fine" } }}
        />
      </Box>
    </Grommet>
  )
}
