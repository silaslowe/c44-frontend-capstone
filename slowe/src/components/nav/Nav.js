import React from "react"
import { Link } from "react-router-dom"

export const NavBar = (props) => {
  const logout = () => {
    localStorage.setItem("app_user_id", "")
    localStorage.setItem("current_race", "")
    props.history.push("/login")
  }
  return (
    <>
      <h1>SLOWE</h1>
      <button onClick={logout}>Log Out</button>
      <Link to="/sidebar">Metrics</Link>
      <Link to="/user">Users</Link>
      <Link to="/">Home</Link>
    </>
  )
}
