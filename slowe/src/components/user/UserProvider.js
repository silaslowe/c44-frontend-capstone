import React, { useState } from "react"

export const UserContext = React.createContext()

export const UserProvider = (props) => {
  const [user, setUser] = useState({})
  const [users, setUsers] = useState({})

  const getUsers = () => {
    return fetch(`http://localhost:8088/users`)
      .then((res) => res.json())
      .then(getUsers)
  }

  const getUserById = (id) => {
    return fetch(`http://localhost:8088/users/${id}`)
      .then((res) => res.json())
      .then(setUser)
  }

  const removeUser = (id) => {
    return fetch(`http://localhost:8088/users/${id}`, {
      method: "DELETE",
    })
  }
  return (
    <UserContext.Provider value={{ getUserById, removeUser, user, users, getUsers }}>
      {props.children}
    </UserContext.Provider>
  )
}
