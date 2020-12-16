import React, { useContext } from "react"
import { WorkoutContext } from "./WorkoutProvider"

export const Workout = (props) => {
  const { updateWorkout } = useContext(WorkoutContext)
  const { speed, distance, time, workout, date } = props

  if (workout.isComplete && workout.workoutDist > distance && workout.workoutTime < speed) {
    // updateWorkout({
    //   metGoal: true,
    //   id: workout.id,
    // })
    return (
      <div className="workout-card metGoal">
        <p className="workout-date">{date}</p>
        <div className="workout-data">
          <div className="workout-card-goals">
            <p>Distance:{distance.toFixed(1)} miles</p>
            <p>Time: {speed.toFixed(1)} minutes</p>
            <p>
              Speed:
              {(distance.toFixed(1) / (speed.toFixed(1) / 60)).toFixed(1)} mph
            </p>
          </div>
          <div className="workout-card-achievement">
            <p>Distance: {workout.workoutDist} miles</p>
            <p>Time: {workout.workoutTime} minutes</p>
            <p>Speed: {(workout.workoutTime / workout.workoutDist).toFixed(2) || 0}</p>
            <p>Notes: {workout.notes}</p>
          </div>
        </div>
        <button
          onClick={() => {
            props.history.push({
              pathname: `/edit-workout/${workout.id}`,
              state: { workoutId: workout.id, speed, distance },
            })
          }}
        >
          Edit
        </button>
      </div>
    )
  } else {
    return (
      <div className="workout-card">
        <p className="workout-date">{date}</p>
        <div className="workout-data">
          <div className="workout-card-goals">
            <p>Distance:{distance.toFixed(1)} miles</p>
            <p>Time: {speed.toFixed(1)} minutes</p>
            <p>
              Speed:
              {(distance.toFixed(1) / (speed.toFixed(1) / 60)).toFixed(1)} mph
            </p>
          </div>
          <div className="workout-card-achievement">
            <p>Distance: {workout.workoutDist} Test miles</p>
            <p>Time: {workout.workoutTime}</p>
            <p>Speed: {(workout.workoutTime / workout.workoutDist).toFixed(2) || 0}</p>
            <p>Notes: {workout.notes}</p>
          </div>
        </div>
        <button
          onClick={() => {
            props.history.push({
              pathname: `/edit-workout/${workout.id}`,
              state: { workoutId: workout.id, speed: speed, distance: distance },
            })
          }}
        >
          Edit
        </button>
      </div>
    )
  }
}
