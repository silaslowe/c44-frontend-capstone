import React, { useContext, useEffect, useState } from "react"
import { WorkoutContext } from "./WorkoutProvider"
import { Box, Button, Grommet, TextInput, Text, TextArea, Heading } from "grommet"
import { theme } from "../../theme"

export const EditWorkout = (props) => {
  console.log(props)
  const { workouts, getWorkouts, updateWorkout } = useContext(WorkoutContext)
  const [workout, setWorkout] = useState({})

  const handleControlledInputChange = (e) => {
    const newWorkout = Object.assign({}, workout)
    newWorkout[e.target.name] = e.target.value
    setWorkout(newWorkout)
  }

  useEffect(() => {
    getWorkouts()
  }, [])

  useEffect(() => {
    setWorkout(workouts.find((wo) => wo.id === props.location.state.workoutId) || {})
  }, [workouts])

  console.log(workout)
  const constructNewWorkout = () => {
    const woDist = parseFloat(workout.workoutDist)
    const woTime = parseInt(workout.workoutTime)
    if (isNaN(woDist)) {
      window.alert("Please input a valid distance")
    } else if (isNaN(woTime)) {
      window.alert("Please input a valid time in  minutes")
    } else if (!woTime || !woDist) {
      window.alert("Please complete form before submitting")
    } else if (
      parseFloat(workout.workoutDist) >= props.location.state.distance &&
      parseFloat(workout.workoutTime) <= props.location.state.time
    ) {
      updateWorkout({
        id: props.location.state.workoutId,
        raceId: workout.raceId,
        distanceGoal: workout.distanceGoal,
        timeGoal: workout.timeGoal,
        workoutDist: woDist,
        workoutTime: woTime,
        userId: workout.userId,
        notes: workout.notes,
        isComplete: true,
        metGoal: true,
      })
      props.history.push("/")
    } else {
      updateWorkout({
        id: props.location.state.workoutId,
        raceId: workout.raceId,
        distanceGoal: workout.distanceGoal,
        timeGoal: workout.timeGoal,
        workoutDist: woDist,
        workoutTime: woTime,
        userId: workout.userId,
        notes: workout.notes,
        isComplete: true,
        metGoal: false,
      })
      props.history.push("/")
    }
  }
  return (
    <Grommet theme={theme}>
      <Box alignContent="center">
        <Box alignSelf="center">
          <Box elevation="large" margin="medium" background="light-5" round>
            <Heading level="4" alignSelf="center" margin="medium">
              Current Workout Goals
            </Heading>
            <Box direction="row" alignSelf="center">
              {/*Goal Distance */}
              <Box
                border={{ size: "medium", color: "black" }}
                round={{ "rounding": 12 }}
                margin="small"
              >
                <Text margin="small">
                  Distance: {props.location.state.distance.toFixed(2)} miles
                </Text>
              </Box>
              {/*Goal Time */}
              <Box
                border={{ size: "medium", color: "black" }}
                round={{ "rounding": 12 }}
                margin="small"
              >
                <Text margin="small">Time: {props.location.state.time.toFixed(2)} minutes</Text>
              </Box>
            </Box>
          </Box>
          <Heading alignSelf="center" level="4">
            Enter Workout Data
          </Heading>
          <Box direction="row" justify="around" alignContent="around">
            <Box width="medium">
              {/* Workout Distance */}
              <Box width="small" margin={{ "left": "large" }}>
                <Heading level="5" margin="small">
                  Workout Distance:
                </Heading>
                <Box margin="xxsmall">
                  <TextInput
                    type="text"
                    name="workoutDist"
                    value={workout.workoutDist || ""}
                    onChange={handleControlledInputChange}
                  />
                </Box>
              </Box>
            </Box>
            {/* Workout Time */}
            <Box width="small" margin={{ "right": "large" }}>
              <Heading level="5" margin="small">
                Workout Time:
              </Heading>
              <Box margin="xxsmall">
                <TextInput
                  type="text"
                  name="workoutTime"
                  value={workout.workoutTime || ""}
                  onChange={handleControlledInputChange}
                />
              </Box>
            </Box>
          </Box>
          {/* Notes */}
          <Box gridArea="notes">
            <Heading level="4" margin="small">
              Notes:
            </Heading>
            <Box width="mdeium" height="small">
              <TextArea
                name="notes"
                placeholder="Enter notes here..."
                value={workout.notes || ""}
                onChange={handleControlledInputChange}
                fill
              />
            </Box>
          </Box>

          <Button
            primary
            margin="small"
            label="Submit"
            onClick={(e) => {
              e.preventDefault()
              constructNewWorkout()
            }}
          />
        </Box>
      </Box>
    </Grommet>
  )
}
