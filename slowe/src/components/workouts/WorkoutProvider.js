import React, { useState } from "react"

export const WorkoutContext = React.createContext()

export const WorkoutProvider = (props) => {
  const [workouts, setWorkouts] = useState([])

  const getWorkoutsByRace = (id) => {
    return fetch("http://localhost:8088/workouts/")
      .then((res) => res.json())
      .then((parsed) => {
        const parsedWorkouts = parsed.filter((workout) => {
          return workout.raceId === id
        })
        return parsedWorkouts
      })
      .then(setWorkouts)
  }

  const getWorkouts = () => {
    return fetch("http://localhost:8088/workouts")
      .then((res) => res.json())
      .then(setWorkouts)
  }

  const updateWorkout = (workout) => {
    return fetch(`http://localhost:8088/workouts/${workout.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workout),
    }).then(getWorkouts)
  }

  const addWorkout = (workout) => {
    return fetch("http://localhost:8088/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workout),
    })
  }
  return (
    <WorkoutContext.Provider
      value={{ workouts, getWorkoutsByRace, addWorkout, getWorkouts, setWorkouts, updateWorkout }}
    >
      {props.children}
    </WorkoutContext.Provider>
  )
}
