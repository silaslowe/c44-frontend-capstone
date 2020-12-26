import React, { useContext, useEffect } from "react"
import { UserContext } from "./UserProvider"
import { Box, Button, Grommet, Heading, Text } from "grommet"
import { theme } from "../../theme"

export const User = (props) => {
  const { user, getUserById, removeUser } = useContext(UserContext)

  useEffect(() => {
    getUserById(localStorage.getItem("app_user_id"))
  }, [])
  return (
    <Grommet theme={theme}>
      <Box alignSelf="center" margin={{ "top": "large", "bottom": "xlarge" }}>
        <Box alignSelf="center" width="medium" elevation="large" pad="medium" background="light-5">
          <Heading level="3" alignSelf="center">
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
    </Grommet>
  )
}
