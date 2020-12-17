import React, { useContext, useState, useEffect } from "react"
import { UserContext } from "./UserProvider"

export const User = (props) => {
  const { user, getUserById, removeUser } = useContext(UserContext)

  useEffect(() => {
    getUserById(localStorage.getItem("app_user_id"))
  }, [])
  return (
    <>
      <h1>User Info</h1>
      <p>Users name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Id: {user.id}</p>
      <p>Password: {user.password}</p>
      <button
        onClick={(e) => {
          e.preventDefault()
          removeUser(localStorage.getItem("app_user_id"))
          localStorage.setItem("app_user_id", "")
          localStorage.setItem("current_race", "")
          props.history.push("/login")
        }}
      >
        Delete Account
      </button>
    </>
  )
}
