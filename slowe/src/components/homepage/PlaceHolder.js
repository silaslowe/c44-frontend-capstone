import React, { useEffect } from "react"

export const PlaceholderPage = (props) => {
  useEffect(() => {
    props.history.push("/")
  }, [])
  return <></>
}
