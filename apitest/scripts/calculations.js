//distacne = distance of race form input
//raceDate = date of race form input
// startDist = dist percent from parameters input
// desiredRaceTime = dist percent from parameters input
// startDist = dist percent from parameters input

export const calc = () => {
  //From DOM
  const currentDate = Date.now()
  //Race Form
  const raceDistance = 6
  const raceDate = new Date(1608530400000)

  //   From Parameters
  const startDistPercent = 0.5
  //   This is in min for now but will be hr/min/sec
  const goalRaceTime = 60
  const startPacePercent = 0.8

  const daysBetween = Math.ceil((raceDate - currentDate) / (24 * 60 * 60 * 1000))

  //   Determines Distance Increace
  const startDistance = raceDistance * startDistPercent
  const distanceIncrementer = (raceDistance - startDistance) / daysBetween

  //   Determines Speed Increase

  const goalSpeedInMinPerMile = goalRaceTime / raceDistance
  const goalSpeedInMPH = goalRaceTime / goalSpeedInMinPerMile

  const startPace = goalSpeedInMPH * startPacePercent

  console.log(startPace)
  //   console.log(goalSpeedInMPH)

  //   console.log(daysBetween)
}
