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
  allMarkdownRemark: {
    edges: {
      node: {
        excerpt: string
        frontmatter: {
          title: string
          date: string
          description: string
        }
        fields: {
          slug: string
        }
      }
    }[]
  }
}

const PostList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: ${rhythm(1)};
`

const BlogIndex = ({ data }: PageProps<Data>) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout title={siteTitle} home>
      <SEO title="All posts" />

      <PostList>
        {posts.map(({ node }) => (
          <PostListItem node={node} key={node.fields.slug} />
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
