import React from "react"

export const Workout = ({ workout }) => {
  return (
    <div>
      <p>Distance{workout.distanceGoal}</p>
      <p>Race Id: {workout.raceId}</p>
    </div>
  )
}
