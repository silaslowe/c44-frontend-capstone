import React, { useState } from "react"

export const WorkoutContext = React.createContext()

export const WorkoutProvider = (props) => {
  const [workouts, setWorkouts] = useState([])

  const getWorkoutsByRace = (raceId) => {
    return fetch("http://localhost:8088/workouts")
      .then((res) => res.json())
      .then((parsed) => {
        const parsedWorkouts = parsed.filter((workout) => workout.raceId === raceId)
        return parsedWorkouts
      })
      .then(setWorkouts)
  }
  return (
    <WorkoutContext.Provider value={{ workouts, getWorkoutsByRace }}>
      {props.children}
    </WorkoutContext.Provider>
  )
}
