import React, { useContext, useEffect } from "react"
import { RacesContext } from "../races/RacesProvider"
import { Workout } from "./Workout"

export const WorkoutGenerator = (props) => {
  const { getSelectedRace, selectedRace } = useContext(RacesContext)

  let startDate = selectedRace.startDate
  let raceDate = selectedRace.date
  let num = 1
  const output = []
  useEffect(() => {
    getSelectedRace()
  }, [])
  const daysBetween = Math.ceil((raceDate - startDate) / (24 * 60 * 60 * 1000))

  for (let i = 0; i < daysBetween; i++) {
    output.push(num)
    num++
  }
  console.log(output)
  return (
    <>
      <ul>
        {output.map((workout) => (
          <Workout />
        ))}
      </ul>
    </>
  )
}
