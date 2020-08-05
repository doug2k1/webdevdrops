import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { themeColor } from "../styles/vars"
import { rhythm } from "../utils/typography"
import Container from "./Container"
import Nav from "./Nav"

const Logo = styled.img`
  margin: 0;
  width: 250px;
`

const StyledHeader = styled.header`
  background: ${themeColor};
  margin-bottom: ${rhythm(1.5)};
`

export default function Header() {
  return (
    <StyledHeader>
      <Container>
        <Link to={`/`}>
          <Logo src={`/images/webdevdrops-logo-500.png`} alt="Web Dev Drops" />
        </Link>
      </Container>

      <Nav />
    </StyledHeader>
  )
}
