let races = ""

export const useRaces = () => {
  return races.slice()
}

export const getRaces = () => {
  return fetch(
    "https://cors-anywhere.herokuapp.com/http://www.RunReg.com/api/search?states=MA&eventtype=Trail"
  )
    .then((res) => res.json())
    .then((parsedRaces) => {
      races = parsedRaces.MatchingEvents
    })
}
