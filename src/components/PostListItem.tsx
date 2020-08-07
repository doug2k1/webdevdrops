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

const PostListItem = ({ post }) => {
  const title = post.title || post.slug
  const postDate = new Date(post.date).toLocaleDateString("pt-BR")

  return (
    <article>
      <Link to={post.slug}>
        {post.featuredImage && (
          <Image
            fluid={post.featuredImage.node.localFile.childImageSharp.fluid}
            alt={title}
          />
        )}
      </Link>
      <PostLink to={post.slug} className="post-list-item-title">
        <Title>{title}</Title>
        <SubTitle>{postDate}</SubTitle>
      </PostLink>
    </article>
  )
}

export default PostListItem
