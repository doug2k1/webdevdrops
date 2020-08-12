import React from "react"
import styled from "styled-components"
import { useTranslation } from "react-i18next"
import { rhythm } from "../utils/typography"
import { themeColor } from "../styles/vars"
import Container from "./Container"

const StyledFooter = styled.footer`
  color: #ccc;
  font-size: 14px;
  border-top: 5px solid ${themeColor};
  background: #343434;

  a {
    color: #fff;

    &:hover {
      text-decoration: underline;
    }
  }
`

const FooterContainer = styled(Container)`
  padding-top: ${rhythm(2)};
  padding-bottom: ${rhythm(1)};
`

const FooterCols = styled.div`
  display: flex;
  justify-content: space-between;
`

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;

  a {
    display: inline-block;
    padding: 4px 0;
    font-weight: normal;
  }
`

const FooterCopyright = styled.div`
  text-align: center;
  padding: ${rhythm(0.5)} 0;
`

export default function Footer() {
  const { t } = useTranslation()

  return (
    <StyledFooter>
      <FooterContainer>
        <FooterCols>
          <div>
            <img
              src={`/images/webdevdrops-logo-500.png`}
              alt="Web Dev Drops"
              style={{ width: 125 }}
            />
          </div>
          <FooterLinks>
            <a href="">{t("contact")}</a>
            <a href="">{t("privacyPolicy")}</a>
          </FooterLinks>
          <div>&nbsp;</div>
        </FooterCols>
      </FooterContainer>
      <FooterCopyright>
        © 2010 - {new Date().getFullYear()} | {t("footer.copyright")}{" "}
        <a href="https://www.gatsbyjs.org" target="_blank">
          Gatsby
        </a>{" "}
        {t("footer.by")}{" "}
        <a href="https://www.linkedin.com/in/douglasmatoso/" target="_blank">
          Douglas Matoso
        </a>
      </FooterCopyright>
    </StyledFooter>
  )
}
