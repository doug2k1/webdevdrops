const path = require("path")
const fs = require("fs")
const { siteMetadata } = require("./gatsby-config")

// fix self signed certificate on local Wordpress
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogList = path.resolve("./src/templates/BlogList.tsx")
  const blogPost = path.resolve("./src/templates/BlogPost.tsx")
  const result = await graphql(
    `
      {
        allWpPost {
          nodes {
            id
            slug
            language {
              slug
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const posts = result.data.allWpPost.nodes
  const postsPerPage = 3
  const numPages = Math.ceil(posts.length / postsPerPage)

  // Create blog list pages
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? "/" : `/page/${i + 1}`,
      component: blogList,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  // Create blog posts
  posts.forEach((post) => {
    const language = post.language && post.language.slug
    const link =
      language && language !== siteMetadata.defaultLanguage
        ? `${language}/${post.slug}`
        : post.slug

    createPage({
      path: link,
      component: blogPost,
      context: {
        slug: post.slug,
      },
    })
  })
}
