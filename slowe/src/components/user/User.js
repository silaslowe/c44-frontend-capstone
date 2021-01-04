import React, { useContext, useEffect } from "react"
import { UserContext } from "./UserProvider"
import { Box, Button, Grommet, Heading, Text } from "grommet"
import { theme } from "../../theme"
import { RaceResultList } from "../raceResults/RaceResultsList"

export const User = (props) => {
  const { user, getUserById, removeUser } = useContext(UserContext)

  useEffect(() => {
    getUserById(localStorage.getItem("app_user_id"))
  }, [])
  return (
    <Grommet theme={theme}>
      <Box alignSelf="center" margin={{ "top": "large", "bottom": "xlarge" }} pad="medium">
        <Box
          alignSelf="center"
          width="medium"
          elevation="large"
          pad="medium"
          background="light-5"
          round
        >
          <Heading level="3" alignSelf="center" margin="medium">
            User Info
          </Heading>
          <p>Users name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Id: {user.id}</p>
          <p>Password: {user.password}</p>
          <Box direction="row" justify="evenly">
            <Button
              primary
              label="Delete Account"
              onClick={(e) => {
                e.preventDefault()
                removeUser(localStorage.getItem("app_user_id"))
                localStorage.setItem("app_user_id", "")
                localStorage.setItem("current_race", "")
                props.history.push("/login")
              }}
            />

            <Button
              primary
              label="New Race"
              onClick={() => {
                localStorage.setItem("current_race", "")
                props.history.push("/raceform")
              }}
            />
          </Box>
        </Box>
      </Box>
      <RaceResultList />
    </Grommet>
  )
}
