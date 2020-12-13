import React from "react"

export const Workout = ({ workout }) => {
  if (workout.distanceGoal && workout.timeGoal) {
    return (
      <div className="workout-card">
        <div className="workout-card-goals">
          <p>Distance:{workout.workoutDist} miles</p>
          <p>Time: {workout.timeGoal} minutes</p>
          <p>
            Speed:{" "}
            {(workout.distanceGoal.toFixed(1) / (workout.timeGoal.toFixed(1) / 60)).toFixed(2)} mph
          </p>
        </div>
        <div className="workout-card-achievement">
          <p>Distance: {workout.raceId}</p>
          <p>Time: {workout.raceId}</p>
          <p>Speed: </p>
        </div>
      </div>
    )
  } else {
    return (
      <div className="workout-card">
        <div className="workout-card-goals">
          <p>Distance:{workout.workoutDist} miles</p>
          <p>Time: {workout.timeGoal} minutes</p>
          <p>Speed: "" mph</p>
        </div>
        <div className="workout-card-achievement">
          <p>Distance: {workout.raceId}</p>
          <p>Time: {workout.raceId}</p>
          <p>Speed: </p>
        </div>
      </div>
    )
  }
}
