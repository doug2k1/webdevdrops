import React from "react"
import { rhythm } from "../utils/typography"
import styled from "styled-components"
import { themeColor } from "../styles/vars"

const Link = styled.a`
  border-left: 5px solid ${themeColor};
  font: 16px "Fira Sans", "sans-serif";
  display: flex;
  align-items: center;
  color: #fff;
  background: #343434;
  padding: ${rhythm(1)} ${rhythm(0.5)};
  margin-bottom: ${rhythm(0.75)};
  text-transform: uppercase;
  transition-property: border, transform;
  transition-duration: 100ms;

  &:hover {
    color: #fff;
    border-left-width: 10px;
  }

  svg {
    margin-right: ${rhythm(0.5)};
  }
`

const SidebarLink = ({ icon, text, url }) => {
  return (
    <Link href={url} target="_blank" rel="nofollow noreferrer">
      {icon}
      {text}
    </Link>
  )
}

export default SidebarLink
