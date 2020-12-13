import React from "react"

export const Parameters = (props) => {
  const currentRace = props.location.state.currentRace
  return (
    <>
      <div className="parameters-box">
        <p>Starting Dist Percent: {(currentRace.startDistPercent * 100).toFixed(0)}%</p>
        <p>Time Goal: {currentRace.goalRaceTime} minutes</p>
        <p>Starting Speed Percent: {currentRace.startPacePercent.toFixed(2) * 100}%</p>
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
