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
      <div className="nav">
        <h1 className="app-name">SLOWE</h1>
        <div className="nav-links">
          <Link className="link" to="/sidebar">
            Metrics
          </Link>
          <Link className="link" to="/user">
            Users
          </Link>
          <Link className="link" to="/">
            Home
          </Link>
          <button className="logout-btn" onClick={logout}>
            Log Out
          </button>
        </div>
      </div>
    </>
  )
}
