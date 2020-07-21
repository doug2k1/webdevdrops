import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"
import { rhythm } from "../utils/typography"
import { themeColor } from "../styles/vars"

const Image = styled(Img)`
  border: 1px solid #ccc;
  display: block;
  margin-bottom: ${rhythm(0.5)};
  width: 100%;
`

const Title = styled.span`
  display: block;
  font: 400 22px "Fira Sans", "sans-serif";
`

const SubTitle = styled.small`
  color: #333;
`

const PostLink = styled(Link)`
  color: #000;

  &:hover {
    color: ${themeColor};
  }
`

const PostListItem = ({ node }) => {
  const title = node.title || node.slug

  return (
    <article>
      <Link to={node.slug}>
        {node.featured_media && (
          <Image
            fluid={node.featured_media.localFile.childImageSharp.fluid}
            alt={title}
          />
        )}
      </Link>
      <PostLink to={node.slug} className="post-list-item-title">
        <Title>{title}</Title>
        <SubTitle>{node.date}</SubTitle>
      </PostLink>
    </article>
  )
}

export default PostListItem
