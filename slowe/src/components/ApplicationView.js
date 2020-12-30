import React from "react"
import { Route } from "react-router-dom"
import { RacesProvider } from "./races/RacesProvider"
import { RaceForm } from "./races/RaceForm"
import { RaceInfo } from "./races/RaceInfo"
import { WorkoutProvider } from "./workouts/WorkoutProvider"
import { Home } from "./homepage/Home"
import { EditWorkout } from "./workouts/EditWorkout"
import { SideBar } from "../components/sidebar/SideBar"
import { PlaceholderPage } from "./homepage/PlaceHolder"
import { StateProvider } from "./races/StateProvider"
import { UserProvider } from "./user/UserProvider"
import {
  RaceResultContext,
  RaceResultProvider,
} from "../components/raceResults/RaceResultsProvider"
import { User } from "./user/User"

export const ApplicationViews = (props) => {
  return (
    <>
      {/* To home page */}
      <RacesProvider>
        <WorkoutProvider>
          <StateProvider>
            <RaceResultProvider>
              <Route exact path="/" render={(props) => <Home {...props} />} />
            </RaceResultProvider>
          </StateProvider>
        </WorkoutProvider>
      </RacesProvider>
      {/* To raceForm */}
      <RacesProvider>
        <StateProvider>
          <Route exact path="/raceform" render={(props) => <RaceForm {...props} />} />
        </StateProvider>
      </RacesProvider>
      {/* To metrics */}
      <WorkoutProvider>
        <RacesProvider>
          <Route exact path="/sidebar" render={(props) => <RaceInfo {...props} />} />
          <Route exact path="/sidebar" render={(props) => <SideBar {...props} />} />
        </RacesProvider>
      </WorkoutProvider>
      {/* To transition page */}
      <Route exact path="/placehold" render={(props) => <PlaceholderPage {...props} />} />
      {/* To edit workout page */}
      <WorkoutProvider>
        <Route
          exact
          path="/edit-workout/:workout(\d+)"
          render={(props) => <EditWorkout {...props} />}
        />
      </WorkoutProvider>
      {/* To user info */}
      <UserProvider>
        <RaceResultProvider>
          <RacesProvider>
            <Route exact path="/user" render={(props) => <User {...props} />} />
          </RacesProvider>
        </RaceResultProvider>
      </UserProvider>
    </>
  )
}
