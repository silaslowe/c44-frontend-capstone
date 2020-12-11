import React, { useState, useEffect } from "react"

export const RacesContext = React.createContext()

export const RacesProvider = (props) => {
  const [races, setRaces] = useState([])
  const [selectedRace, setSelectedRace] = useState([])
  const [lastRace, setLastRace] = useState([])

  const getRaces = () => {
    return fetch("http://localhost:8088/races")
      .then((res) => res.json())
      .then(setRaces)
  }

  const getLastRace = () => {
    return fetch("http://localhost:8088/races")
      .then((res) => res.json())
      .then((parsed) => {
        parsed.sort((a, b) => b.startDate - a.startDate)
      })
      .then(setLastRace)
  }

  const getSelectedRace = (id) => {
    return fetch("http://localhost:8088/races")
      .then((res) => res.json())
      .then((parsed) => {
        const selected = parsed
          .filter((race) => race.userId === id)
          .sort((a, b) => b.startDate - a.startDate)
        return selected[0]
      })
      .then(setSelectedRace)
  }

  const addRace = (race) => {
    return fetch("http://localhost:8088/races", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(race),
    }).then(getRaces)
  }

  const editRace = (race) => {
    return fetch(`http://localhost:8088/races/${race.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(race),
    }).then(getRaces)
  }
  return (
    <RacesContext.Provider
      value={{
        races,
        selectedRace,
        getRaces,
        addRace,
        editRace,
        getSelectedRace,
        lastRace,
        getLastRace,
        editRace,
      }}
    >
      {props.children}
    </RacesContext.Provider>
  )
}
