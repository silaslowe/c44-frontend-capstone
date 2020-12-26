import React from "react"

import { Anchor, Grommet, Header, Heading, Box, Button } from "grommet"
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
        <Box direction="row" alignContent="center">
          <Link className="link" to="/">
            <Box margin={{ left: "small", right: "small" }}>
              <Run color="black" size="large" />
            </Box>
          </Link>
          <Link className="link" to="/sidebar">
            <Box margin={{ left: "small", right: "small" }}>
              <Analytics color="black" size="large" />
            </Box>
          </Link>
          <Link className="link" to="/user">
            <Box margin={{ left: "small", right: "small" }}>
              <User color="black" size="large" />
            </Box>
          </Link>
          <Button primary label="Logout" margin={{ "right": "small" }} onClick={logout} />
        </Box>
      </Header>
    </Grommet>
  )
}

// export const Simple = () => (
//   <Grommet theme={grommet}>
//     <Header background="light-4" pad="small">
//       <Nav direction="row">
//         <Anchor label="Home" href="#" />
//         <Anchor label="Profile" href="#" />
//       </Nav>
//     </Header>
//   </Grommet>
