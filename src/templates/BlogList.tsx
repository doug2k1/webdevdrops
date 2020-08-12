import React from "react"
import { PageProps, graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import PostListItem from "../components/PostListItem"
import styled from "styled-components"
import { rhythm } from "../utils/typography"
import Pagination from "../components/Pagination"

type Data = {
  site: {
    siteMetadata: {
      title: string
      defaultLanguage: string
    }
  }
  allWpPost: {
    nodes: {
      slug: string
      excerpt: string
      title: string
    }[]
  }
}

interface Context {
  limit: number
  skip: number
  numPages: number
  currentPage: number
}

const PostList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: ${rhythm(1)};
  row-gap: ${rhythm(2)};
`

const BlogList = ({ data, pageContext }: PageProps<Data, Context>) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allWpPost.nodes
  const { currentPage, numPages } = pageContext

  return (
    <Layout title={siteTitle} home>
      <SEO title="All posts" />

      <PostList>
        {posts.map((post) => (
          <PostListItem post={post} key={post.slug} />
        ))}
      </PostList>

      <Pagination currentPage={currentPage} numPages={numPages} />
    </Layout>
  )
}

export default BlogList

export const pageQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allWpPost(
      limit: $limit
      skip: $skip
      sort: { fields: [date], order: DESC }
    ) {
      nodes {
        slug
        excerpt
        title
        date
        language {
          slug
        }
        featuredImage {
          node {
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
