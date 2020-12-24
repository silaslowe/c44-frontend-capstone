import React from "react"

import { Anchor, Grommet, Header, Heading, Box, Button } from "grommet"
import { theme } from "../../theme"
import { Link } from "react-router-dom"

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
          <Link className="link" to="/sidebar">
            Metrics
          </Link>
          <Link className="link" to="/user">
            Users
          </Link>
          <Link className="link" to="/">
            Race
          </Link>
          <Button primary label="Logout" onClick={logout} />
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
