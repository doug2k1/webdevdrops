import React, { FC } from "react"
import { rhythm } from "../utils/typography"
import styled, { createGlobalStyle } from "styled-components"
import Container from "./Container"
import Footer from "./Footer"
import Header from "./Header"
import { useTranslation } from "react-i18next"

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

const Main = styled(Container)`
  margin-bottom: ${rhythm(1)};
`

const Layout: FC<Props> = ({ title, children, home = false }) => {
  return (
    <>
      <GlobalStyle />
      <div>
        <Header />

        <Main>{children}</Main>

        <Footer />
      </div>
    </>
  )
}

export default Layout
