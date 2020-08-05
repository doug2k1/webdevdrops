import React from "react"
import styled from "styled-components"
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"
import Container from "./Container"

const StyledNav = styled.nav`
  display: flex;
  font-size: 15px;

  a {
    color: #fff;
    padding: 10px;
    margin-right: 10px;
    opacity: 0.8;

    &:hover {
      opacity: 1;
    }
  }
`

const NavContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SocialLinks = styled.div`
  a {
    display: inline-block;
    padding: 0 4px;
    color: #fff;
    opacity: 0.8;

    &:hover {
      opacity: 1;
    }
  }
`

export default function Nav() {
  return (
    <NavContainer>
      <StyledNav>
        <a href="">HOME</a>
        <a href="">CONTATO</a>
      </StyledNav>

      <SocialLinks>
        <a href="" target="_blank">
          <FaTwitter size={20} />
        </a>
        <a href="" target="_blank">
          <FaInstagram size={20} />
        </a>
        <a href="" target="_blank">
          <FaFacebook size={20} />
        </a>
      </SocialLinks>
    </NavContainer>
  )
}
