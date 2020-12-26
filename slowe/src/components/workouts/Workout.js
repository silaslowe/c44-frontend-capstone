import React from "react"
import { Box, Button, Grid, Grommet, Heading, Text } from "grommet"
import { theme } from "../../theme"
import { Edit } from "grommet-icons"

export const Workout = (props) => {
  const { speed, distance, workout, date, time } = props
  const workoutSpeed = parseFloat(((60 / workout.workoutTime) * workout.workoutDist).toFixed(2))
  console.log(speed)

  // Adds metGoal className if goals have been met
  if (workout.isComplete && workout.workoutDist > distance && workout.workoutTime < time) {
    return (
      <Grommet theme={theme}>
        <Box pad={{ left: "large", right: "large" }} className="workout-card metGoal">
          <Box
            margin="small"
            pad="small"
            border={{
              "color": "black",
              "size": "medium",
              "style": "solid",
              "side": "all",
            }}
            background="#66cc00"
            elevation="large"
          >
            <Box direction="row" justify="between" alignContent="center">
              <Box pad="small" border={{ "side": "all" }}>
                <Text className="workout-date">{date}</Text>
              </Box>
              <Box align="center">
                <Box direction="row">
                  <Button
                    plain={false}
                    icon={<Edit />}
                    onClick={() => {
                      props.history.push({
                        pathname: `/edit-workout/${workout.id}`,
                        state: { workoutId: workout.id, speed, distance },
                      })
                    }}
                  />
                </Box>
              </Box>
            </Box>
            <Grid
              rows={["auto", "auto"]}
              columns={["1/2", "1/2"]}
              areas={[
                ["goal", "workout"],
                ["notes", "notes"],
              ]}
            >
              {/* Goal */}
              <Box gridArea="goal" className="workout-card-goals" pad={{ "left": "medium" }}>
                <Heading level="4" margin="xxsmall">
                  Goal
                </Heading>
                <Text margin="xsmall">Distance:{distance.toFixed(2)} miles</Text>
                <Text margin="xsmall">Time: {time.toFixed(1)} minutes</Text>
                <Text margin="xsmall">
                  Speed:
                  {parseFloat(speed.toFixed(2))} mph
                </Text>
              </Box>
              {/* Workout */}
              <Box
                gridArea="workout"
                className="workout-card-achievement"
                pad={{ "left": "large" }}
              >
                <Heading level="4" margin="xxsmall">
                  Workout
                </Heading>
                <Text margin="xsmall">Distance: {workout.workoutDist} miles</Text>
                <Text margin="xsmall">Time: {workout.workoutTime} minutes</Text>
                <Text margin="xsmall">Speed: {workoutSpeed || 0} mph</Text>
              </Box>
              {/* Notes */}
              <Box
                gridArea="notes"
                height="xxsmall"
                border={{ "side": "top", "color": "black", "style": "solid" }}
              >
                <Text className="workoutCard-notes">Notes: {workout.notes}</Text>
              </Box>
            </Grid>
          </Box>
        </Box>
      </Grommet>
    )
  } else {
    return (
      <Grommet theme={theme}>
        <Box pad={{ left: "large", right: "large" }} className="workout-card metGoal">
          <Box
            margin="small"
            pad="small"
            border={{
              "color": "black",
              "size": "medium",
              "style": "solid",
              "side": "all",
            }}
            elevation="large"
          >
            <Box direction="row" justify="between" alignContent="center">
              <Box pad="small" border={{ "side": "bottom right" }}>
                <Text className="workout-date">{date}</Text>
              </Box>
              <Box align="center">
                <Box direction="row">
                  <Button
                    plain={false}
                    icon={<Edit />}
                    onClick={() => {
                      props.history.push({
                        pathname: `/edit-workout/${workout.id}`,
                        state: { workoutId: workout.id, speed, distance },
                      })
                    }}
                  />
                </Box>
              </Box>
            </Box>
            <Grid
              rows={["auto", "auto"]}
              columns={["1/2", "1/2"]}
              areas={[
                ["goal", "workout"],
                ["notes", "notes"],
              ]}
            >
              {/* Goal */}
              <Box gridArea="goal" className="workout-card-goals" pad={{ "left": "medium" }}>
                <Heading level="4" margin="xxsmall">
                  Goal
                </Heading>
                <Text margin="xsmall">Distance:{distance.toFixed(2)} miles</Text>
                <Text margin="xsmall">Time: {time.toFixed(1)} minutes</Text>
                <Text margin="xsmall">
                  Speed:
                  {parseFloat(speed.toFixed(2))} mph
                </Text>
              </Box>
              {/* Workout */}
              <Box
                gridArea="workout"
                className="workout-card-achievement"
                pad={{ "left": "large" }}
              >
                <Heading level="4" margin="xxsmall">
                  Workout
                </Heading>
                <Text margin="xsmall">Distance: {workout.workoutDist} miles</Text>
                <Text margin="xsmall">Time: {workout.workoutTime} minutes</Text>
                <Text margin="xsmall">Speed: {workoutSpeed || 0} mph</Text>
              </Box>
              {/* Notes */}
              <Box
                gridArea="notes"
                height="xxsmall"
                border={{ "side": "top", "color": "black", "style": "solid" }}
              >
                <Text className="workoutCard-notes">Notes: {workout.notes}</Text>
              </Box>
            </Grid>
          </Box>
        </Box>
      </Grommet>
    )
  }
}
