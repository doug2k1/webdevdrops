import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { rhythm } from "../utils/typography"
import { themeColor } from "../styles/vars"

const Image = styled.img`
  border: 1px solid #ccc;
  display: block;
  margin-bottom: ${rhythm(0.5)};
  width: 100%;
`

const Title = styled.span`
  display: block;
  font: 24px "Fira Sans", "sans-serif";
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
  const title = node.frontmatter.title || node.fields.slug

  return (
    <article>
      <Link to={node.fields.slug}>
        <Image src="https://dummyimage.com/262x147/000/fff" alt={title} />
      </Link>
      <PostLink to={node.fields.slug} className="post-list-item-title">
        <Title>{title}</Title>
        <SubTitle>{node.frontmatter.date}</SubTitle>
      </PostLink>
    </article>
  )
}

export default PostListItem
