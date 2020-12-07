import { getRaces, useRaces } from "./DataProvider.js"

const results = () => {
  getRaces().then(() => {
    const races = useRaces()
    console.log(races)
    return races
  })
}
// console.log("test", results())
results()
