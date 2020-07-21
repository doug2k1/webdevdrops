import React from "react"
import { PageProps, Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import PostListItem from "../components/PostListItem"
import styled from "styled-components"
import { rhythm } from "../utils/typography"

type Data = {
  site: {
    siteMetadata: {
      title: string
    }
  }
  allWordpressPost: {
    edges: {
      node: {
        slug: string
        excerpt: string
        title: string
      }
    }[]
  }
}

const PostList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: ${rhythm(1)};
  row-gap: ${rhythm(2)};
`

const BlogIndex = ({ data }: PageProps<Data>) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allWordpressPost.edges

  return (
    <Layout title={siteTitle} home>
      <SEO title="All posts" />

      <PostList>
        {posts.map(({ node }) => (
          <PostListItem node={node} key={node.slug} />
        ))}
      </PostList>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allWordpressPost {
      edges {
        node {
          slug
          excerpt
          title
          date
          featured_media {
            localFile {
              childImageSharp {
                fluid(maxWidth: 322, maxHeight: 181) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`
