import React from "react"
import { RaceInfo } from "./races/RaceInfo"
import { WorkoutList } from "./workouts/WorkoutList"
import { SideBar } from "./sidebar/SideBar"

export const MainDisplay = (props) => {
  return (
    <>
      <div>
        <RaceInfo {...props} />
        <WorkoutList {...props} />
      </div>
      <div>
        <SideBar {...props} />
      </div>
    </>
  )
}
