import React from "react"
import { RacesProvider } from "./races/RacesProvider"
import { RaceForm } from "./mainpage/RaceForm"

export const ApplicationViews = (props) => {
  return (
    <>
      <RacesProvider>
        <RaceForm />
      </RacesProvider>
    </>
  )
}
