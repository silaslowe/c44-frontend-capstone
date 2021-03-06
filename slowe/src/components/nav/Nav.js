import React from "react"

import { Box, Button, Grommet, Header, Heading, Menu, Nav, ResponsiveContext } from "grommet"
import { theme } from "../../theme"
import { Link } from "react-router-dom"
import { Analytics, Run, User } from "grommet-icons"

export const NavBar = (props) => {
  const logout = () => {
    localStorage.setItem("app_user_id", "")
    localStorage.setItem("current_race", "")
    props.history.push("/login")
  }

  return (
    <Grommet theme={theme}>
      <Header background="light-4" pad="small" elevation="large">
        <Heading className="app-name" level="3">
          SLOWE
        </Heading>
        <ResponsiveContext.Consumer>
          {(responsive) =>
            responsive === "small" ? (
              <Menu
                label="Menu"
                items={[
                  {
                    label: "Run",
                    onClick: () => {
                      props.history.push("/")
                    },
                  },
                  {
                    label: "Metrics",
                    onClick: () => {
                      props.history.push("/sidebar")
                    },
                  },
                  {
                    label: "User",
                    onClick: () => {
                      props.history.push("/user")
                    },
                  },
                  {
                    label: "Logout",
                    onClick: () => {
                      logout()
                    },
                  },
                ]}
              />
            ) : (
              <Nav direction="row">
                <Box direction="row" alignContent="center">
                  <Link label="Race" className="link" to="/">
                    <Box margin={{ left: "small", right: "small" }}>
                      <Run color="black" size="large" />
                    </Box>
                  </Link>
                  <Link label="Metrics" className="link" to="/sidebar">
                    <Box margin={{ left: "small", right: "small" }}>
                      <Analytics color="black" size="large" />
                    </Box>
                  </Link>
                  <Link label="User" className="link" to="/user">
                    <Box margin={{ left: "small", right: "small" }}>
                      <User color="black" size="large" />
                    </Box>
                  </Link>
                  <Button primary label="Logout" margin={{ "right": "small" }} onClick={logout} />
                </Box>
              </Nav>
            )
          }
        </ResponsiveContext.Consumer>
      </Header>
    </Grommet>
  )
}
