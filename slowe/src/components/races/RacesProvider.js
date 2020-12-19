import React, { useState } from "react"

export const RacesContext = React.createContext()

export const RacesProvider = (props) => {
  const [races, setRaces] = useState([])

  const getRaces = () => {
    return fetch("http://localhost:8088/races")
      .then((res) => res.json())
      .then(setRaces)
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
      method: "PATCH",
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
        getRaces,
        addRace,
        editRace,
        editRace,
      }}
    >
      {props.children}
    </RacesContext.Provider>
  )
}
