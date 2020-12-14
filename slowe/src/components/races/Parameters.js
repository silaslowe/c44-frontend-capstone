import React from "react"

export const Parameters = (props) => {
  const currentRace = props.location.state.currentRace
  return (
    <>
      <div className="parameters-box">
        <h2 className="parameters__title">Race Parameters</h2>
        <p>Starting Dist Percent: {(currentRace.startDistPercent * 100).toFixed(0)}%</p>
        <p>Time Goal: {currentRace.goalRaceTime} minutes</p>
        <p>Starting Speed Percent: {(currentRace.startPacePercent * 100).toFixed(0)}%</p>
      </div>
      <button
        onClick={(ev) => {
          ev.preventDefault()
          props.history.push({ pathname: "/parameters", state: { currentRace: currentRace } })
        }}
      >
        Edit
      </button>
    </>
  )
}
