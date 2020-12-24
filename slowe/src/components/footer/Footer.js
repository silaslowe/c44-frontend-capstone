import React from "react"

import { Box, Footer, grommet, Grommet, Main, Text } from "grommet"

export const SloweFooter = () => {
  const date = new Date()
  const year = date.getFullYear()
  return (
    <Grommet theme={grommet}>
      <Footer background="light-4" justify="center" pad="large" alignSelf="end">
        <Text textAlign="start" size="medium">
          © {year} Copyright Slowe
        </Text>
      </Footer>
    </Grommet>
  )
}
