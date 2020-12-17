import React, { useState } from "react"

export const StateContext = React.createContext()

export const StateProvider = (props) => {
  const [states, setStates] = useState([])

  const getStates = () => {
    return fetch("http://localhost:8088/states")
      .then((res) => res.json())
      .then(setStates)
  }
  return (
    <StateContext.Provider value={{ states, setStates, getStates }}>
      {props.children}
    </StateContext.Provider>
  )
}
