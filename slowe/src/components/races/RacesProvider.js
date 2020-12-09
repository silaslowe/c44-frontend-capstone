import React, { useState, useEffect } from "react"

export const RacesContext = React.createContext()

export const RacesProvider = (props) => {
  const [races, setRaces] = useState([])
  const [selectedRace, setSelectedRace] = useState([])

  const getRaces = () => {
    return fetch("http://localhost:8088/races")
      .then((res) => res.json())
      .then(setSelectedRace)
      .then(console.log(races))
  }

  const getRaceSelected = () => {
    return fetch(`http://localhost:8088/races`)
      .then((res) => res.json())
      .then((parsed) => {
        const currentUser = parseInt(localStorage.getItem("app_user_id"))
        const selected = parsed
          .filter((race) => race.userId === currentUser)
          .sort((a, b) => b.startDate - a.startDate)
        console.log(selected[0])
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
      value={{ races, selectedRace, getRaces, addRace, editRace, getRaceSelected }}
    >
      {props.children}
    </RacesContext.Provider>
  )
}
