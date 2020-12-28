import React, { useContext } from "react"
import { WorkoutContext } from "./WorkoutProvider"
import { Box, Button, Grommet } from "grommet"

export const WorkoutGenerator = (props) => {
  const { addWorkout, getWorkouts, workouts } = useContext(WorkoutContext)

  // # of days between start of workouts and race
  let daysBetween = ""
  // holds generated workout objects
  let workoutArray = []

  const generator = () => {
    // filters the workouts by the current races
    const startDate = props.currentRace.startDate
    const raceDate = props.currentRace.date
    const day = 86400000
    let startingDate = startDate
    // determines the days between the the start of training and the race date
    daysBetween = Math.ceil((raceDate - startDate) / (24 * 60 * 60 * 1000))
    // if the amount of filtered workouts is less than days between, which is the needed amount, the for loop gernerates a workout card for each day of training and pushed it into the workoutARray.
    for (let i = 0; i < daysBetween; i++) {
      startingDate += day
      workoutArray.push({
        raceId: props.currentRace.id,
        distanceGoal: props.currentRace.distance,
        timeGoal: props.currentRace.goalRaceTime,
        workoutDist: 0,
        workoutTime: 0,
        notes: "",
        userId: parseInt(localStorage.getItem("app_user_id")),
        date: startingDate,
        isComplete: false,
        metGoal: false,
      })
    }
    // Total timeout time set by map
    const delay = workoutArray.length * 250 + 50

    // posts each workout to the db with a timeout to avoid logjam in json server
    return Promise.all(workoutArray.map((workout) => addWorkout(workout)))
      .then(() => getWorkouts())
      .then(() => console.log(workouts))
    // .then(() => {
    //   setTimeout(() => getWorkouts(), delay)
    // })
    // .then(() => {
    //   console.log("WO", workouts)
    //   console.log("CR", props.currentRace.id)
    //   setTimeout(() => {
    //     props.setCurrentWorkouts(
    //       workouts.filter((workout) => workout.raceId === props.currentRace.id)
    //     )
    //   }, delay + 25)
    // })
  }

  return (
    <Grommet>
      <Box>
        <Box width="small" margin={{ "bottom": "large", "top": "none" }} alignSelf="center">
          <Button
            primary
            width="small"
            label="Generate Workouts"
            onClick={(e) => {
              generator()
            }}
          />
        </Box>
      </Box>
      <Box margin="large"></Box>
    </Grommet>
  )
}
