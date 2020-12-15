import React from "react"

export const Workout = ({ workout, distance, speed, time }, props) => {
  // console.log(distance, speed)
  if (workout.distanceGoal && workout.timeGoal) {
    return (
      <div className="workout-card">
        <div className="workout-card-goals">
          <p>Distance:{distance} miles</p>
          <p>Time: {speed.toFixed(2)} minutes</p>
          <p>
            Speed:
            {(distance.toFixed(1) / (speed.toFixed(1) / 60)).toFixed(2)} mph
          </p>
        </div>
        <div className="workout-card-achievement">
          <p>Distance: 0 miles</p>
          <p>Time: 0</p>
          <p>Speed: 0</p>
        </div>
        <button>Edit</button>
      </div>
    )
  } else {
    return (
      <div className="workout-card">
        <div className="workout-card-goals">
          <p>Distance:{distance} miles</p>
          <p>Time: {time} minutes</p>
          <p>Speed: mph</p>
        </div>
        <div className="workout-card-achievement">
          <p>Distance: {parseInt(0)}</p>
          <p>Time: {parseInt(0)}</p>
          <p>Speed: </p>
        </div>
      </div>
    )
  }
}
