import React from "react"
import { Box, DataChart, Grommet, Text } from "grommet"
import { theme } from "../../theme"

export const SpeedGraph = (props) => {
  const data = props.speedArray

  return (
    <Box align="center" pad="large">
      <Box align="center">
        <Text>MPH Over Time</Text>
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
          y: { property: "speedMPH", granularity: "fine" },
        }}
        guide={{ x: { granularity: "fine" } }}
      />
    </Box>
  )
}

//   return (
//     <DataChart
//       data={data}
//       series={["date", "speedMPH"]}
//       chart={[
//         { property: "date", type: "line", opacity: "medium", thickness: "xsmall" },
//         { property: "speedMPH", type: "point", point: "circle", thickness: "medium" },
//       ]}
//     />
//   )
// }
