//distacne = distance of race form input
//raceDate = date of race form input
// startDist = dist percent from parameters input
// desiredRaceTime = dist percent from parameters input
// startDist = dist percent from parameters input

//From DOM
//   debugger
const currentDate = Date.now()
//Race Form
const raceDistance = 6

const raceDate = new Date(1608616800000)

//   From Parameters
const startDistPercent = 0.5
//   This is in min for now but will be hr/min/sec
const goalRaceTime = 60
const startPacePercent = 0.8

const daysBetween = Math.ceil((raceDate - currentDate) / (24 * 60 * 60 * 1000))

export const calcDist = () => {
  //   Determines Distance Increace
  const startDistance = raceDistance * startDistPercent
  // .5
  const distanceIncrementer = (raceDistance - startDistance) / daysBetween
  //   .214
  console.log("distance increase each day", distanceIncrementer)
}

export const calcSpeed = () => {
  //   Determines Speed Increase

  const goalSpeedInMinPerMile = goalRaceTime / raceDistance
  //   10
  const goalSpeedInMPH = goalRaceTime / goalSpeedInMinPerMile
  // 6
  const startPaceInMPH = goalSpeedInMPH * startPacePercent
  // 4.8
  const startPaceInMinPerMile = goalRaceTime / startPaceInMPH
  // 12.5
  //   const speedIncrementer = (startPaceInMinPerMile - goalSpeedInMinPerMile) / (daysBetween - 1)
  // .19

  const speedIncrementer =
    (goalRaceTime / (goalSpeedInMPH * startPacePercent) - goalSpeedInMinPerMile) / (daysBetween - 1)
  // This would be manage with useEffect ad setState?
  let speedOverTime = startPaceInMinPerMile
  let day = 2
  console.log("Day 1: ", speedOverTime)
  for (let i = 0; i < daysBetween - 1; i++) {
    speedOverTime -= speedIncrementer
    console.log("Day", day, ":", speedOverTime, "MPM")

    day++
  }
}


goalSpeedInMinPerMile - startPaceInMinPerMile = paceDiffOverTime 1.85

paceDiffOverTime / numBays = MPM inc .13

startPaceInMinPerMile + .13

