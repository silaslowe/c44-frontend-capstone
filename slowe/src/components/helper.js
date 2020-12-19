export const currentRaceFinder = (arr, id) => {
  const racesForUser = arr.filter((race) => race.userId === id)
  const raceStartDate = racesForUser.map((race) => race.startDate)
  const newestRace = Math.max(...raceStartDate)
  const currentRace = racesForUser.find((race) => race.startDate === newestRace)
  return currentRace
}
