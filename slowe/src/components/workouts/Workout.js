import React from "react"

export const Workout = (props) => {
  const { speed, distance, time, workout, date } = props
  console.log(workout)
  return (
    <div className="workout-card">
      <p className="workout-date">{date}</p>
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
        <p>Time: {workout.workoutTime}</p>
        <p>Speed: 0</p>
        <p>Notes: {workout.notes}</p>
      </div>
      <button
        onClick={() => {
          props.history.push({
            pathname: `/edit-workout/${workout.id}`,
            state: { workoutId: workout.id },
          })
        }}
      >
        Edit
      </button>
    </div>
  )
}
