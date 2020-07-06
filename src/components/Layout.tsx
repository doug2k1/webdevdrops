import React, { FC } from "react"
import { Link } from "gatsby"
import { rhythm } from "../utils/typography"
import { themeColor } from "../styles/vars"
import styled, { createGlobalStyle } from "styled-components"
import Container from "./Container"

interface Props {
  title: string
  home?: boolean
}

const GlobalStyle = createGlobalStyle`
  html,
  body {
    background: #fff;
  }

  code[class*="language-"],
  pre[class*="language-"] {
    font-size: 14px;
  }

  pre[class*="language-"] {
    margin-left: -3.2rem;
    margin-right: -3.2rem;
    padding-left: 3.2rem;
    padding-right: 3.2rem;
  }
`

const Header = styled.header`
  background: ${themeColor};
  margin-bottom: ${rhythm(1.5)};
`

const HeaderContainer = styled(Container)``

const Nav = styled.nav`
  display: flex;
  font-size: 15px;

  a {
    color: #fff;
    padding: 10px;
    margin-right: 10px;
    opacity: 0.8;
  }

  a:hover {
    opacity: 1;
  }
`

const NavContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
`

const Main = styled(Container)`
  margin-bottom: ${rhythm(1)};
`

const Logo = styled.img`
  margin: 0;
  width: 250px;
`

const Footer = styled.footer`
  color: #ccc;
  font-size: 14px;
  border-top: 5px solid ${themeColor};
  background: #343434;

  a {
    color: #fff;
  }
`

const FooterContainer = styled(Container)`
  padding: ${rhythm(2)} 0;
`

const Layout: FC<Props> = ({ title, children, home = false }) => {
  return (
    <>
      <GlobalStyle />
      <div>
        <Header>
          <HeaderContainer>
            <Link to={`/`}>
              <Logo
                src={`/images/webdevdrops-logo-500.png`}
                alt="Web Dev Drops"
              />
            </Link>
          </HeaderContainer>

          <NavContainer>
            <Nav>
              <a href="">HOME</a>
              <a href="">CONTATO</a>
            </Nav>

            <div>[social]</div>
          </NavContainer>
        </Header>

        <Main>{children}</Main>

        <Footer>
          <FooterContainer>
            <img
              src={`/images/webdevdrops-logo-500.png`}
              alt="Web Dev Drops"
              style={{ width: 125 }}
            />
            © {new Date().getFullYear()}, Feito com
            <a href="https://www.gatsbyjs.org">Gatsby</a>
            <a href="">Contato</a>
            <a href="">Política de Privacidade</a>
          </FooterContainer>
        </Footer>
      </div>
    </>
  )
}

export default Layout
