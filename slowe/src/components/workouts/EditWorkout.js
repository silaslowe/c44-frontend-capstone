import React, { useContext, useEffect, useState } from "react"
import { WorkoutContext } from "./WorkoutProvider"

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

  console.log(workout)

  useEffect(() => {
    setWorkout(workouts.find((wo) => wo.id === props.location.state.workoutId) || {})
  }, [workouts])

  const constructNewWorkout = () => {
    const woDist = parseFloat(workout.workoutDist)
    const woTime = parseInt(workout.workoutTime)

    console.log(woDist, props.location.state.distance)
    console.log(woTime, props.location.state.speed)
    if (
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
    }
  }
  return (
    <form className="workoutForm">
      <h1>Enter Workout Data</h1>

      <fieldset>
        <div className="form-group">
          <label htmlFor="workoutDist">Distance:</label>
          <input
            type="text"
            name="workoutDist"
            required
            autoFocus
            className="form-control"
            prototype="float"
            placeholder="Miles"
            defaultValue={workout.workoutDist}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="workoutTime">Minutes:</label>
          <input
            type="text"
            name="workoutTime"
            required
            autoFocus
            className="form-control"
            prototype="float"
            placeholder="Minutes"
            defaultValue={workout.workoutTime}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            type="text"
            name="notes"
            className="form-control"
            proptype="varchar"
            placeholder="Please enter notes or gentle musings here"
            value={workout.notes}
            onChange={handleControlledInputChange}
          ></textarea>
        </div>
      </fieldset>
      <button
        onClick={(e) => {
          e.preventDefault()
          constructNewWorkout()
          props.history.push("/")
        }}
      >
        Submit
      </button>
    </form>
  )
}
