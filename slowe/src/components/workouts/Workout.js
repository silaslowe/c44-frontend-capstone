import React from "react"

export const Workout = (props) => {
  const { speed, distance, workout, date, time } = props
  const workoutSpeed = parseFloat((workout.workoutTime / workout.workoutDist).toFixed(2))

  // Adds metGoal className if goals have been met
  if (workout.isComplete && workout.workoutDist > distance && workout.workoutTime < time) {
    return (
      <div className="workout-card metGoal">
        <p className="workout-date">{date}</p>
        <div className="workout-data">
          <div className="workout-card-goals">
            <h3>Goal</h3>
            <p>Distance:{distance.toFixed(2)} miles</p>
            <p>Time: {time.toFixed(1)} minutes</p>
            <p>
              Speed:
              {parseFloat(speed.toFixed(2))} mph
            </p>
          </div>
          <div className="workout-card-achievement">
            <h3>Workout</h3>
            <p>Distance: {workout.workoutDist} miles</p>
            <p>Time: {workout.workoutTime} minutes</p>
            <p>Speed: {workoutSpeed || 0} mph</p>
          </div>
          <p className="workoutCard-notes">Notes: {workout.notes}</p>
        </div>
        <button
          className="workoutCard-btn"
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
            <h3>Goal</h3>
            <p>Distance:{distance.toFixed(2)} miles</p>
            <p>
              Time:
              {parseFloat(time.toFixed(2))}
              {/* {time.toFixed(1)} minutes */}
            </p>
            <p>
              Speed:
              {/* {(distance.toFixed(1) / (speed.toFixed(1) / 60)).toFixed(1)} mph */}
              {parseFloat(speed.toFixed(2))}
            </p>
          </div>
          <div className="workout-card-achievement">
            <h3>Workout</h3>
            <p>Distance: {workout.workoutDist} miles</p>
            <p>Time: {workout.workoutTime} minutes</p>
            <p>Speed: {workoutSpeed || 0} mph</p>
          </div>
          <p className="workoutCard-notes">Notes: {workout.notes}</p>
        </div>
        <button
          className="workoutCard-btn"
          onClick={() => {
            props.history.push({
              pathname: `/edit-workout/${workout.id}`,
              state: { workoutId: workout.id, time: time, distance: distance },
            })
          }}
        >
          Edit
        </button>
      </div>
    )
  }
}
