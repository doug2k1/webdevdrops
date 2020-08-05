import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const Wrapper = styled.div``

const PageLink = styled(Link)``

const Pagination = ({ currentPage, numPages }) => {
  return (
    <Wrapper>
      {currentPage > 1 && (
        <PageLink to={currentPage === 2 ? "/" : `/page/${currentPage - 1}`}>
          Página anterior
        </PageLink>
      )}
      {currentPage < numPages && (
        <PageLink to={`/page/${currentPage + 1}`}>Próxima página</PageLink>
      )}
    </Wrapper>
  )
}

export default Pagination
