import React, { useState } from "react"

export const WorkoutsContext = React.createContext()

export const WorkoutsProvider = (props) => {
  const [workouts, setWorkouts] = useState([])

  const getWorkouts = () => {
    return fetch("http://localhost:8088/workouts")
      .then((res) => res.json())
      .then(setWorkouts)
  }
  const editWorkout = (workout) => {
    return fetch(`http://localhost:8088/workouts${workout.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workout),
    }).then(getWorkouts)
  }
  return (
    <WorkoutsContext.Provider value={{ workouts, getWorkouts, editWorkout }}>
      {props.children}
    </WorkoutsContext.Provider>
  )
}
