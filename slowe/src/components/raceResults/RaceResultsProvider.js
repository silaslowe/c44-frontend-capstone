import React, { useState } from "react"

export const RaceResultContext = React.createContext()

export const RaceResultProvider = (props) => {
  const [raceResults, setRaceResults] = useState([])

  const getRaceResults = () => {
    return fetch("http://localhost:8088/raceResults")
      .then((res) => res.json())
      .then(setRaceResults)
  }

  const addRaceResult = (raceResult) => {
    return fetch("http://localhost:8088/raceResults", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(raceResult),
    }).then(getRaceResults)
  }
  return (
    <RaceResultContext.Provider
      value={{
        raceResults,
        getRaceResults,
        addRaceResult,
      }}
    >
      {props.children}
    </RaceResultContext.Provider>
  )
}
