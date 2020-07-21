const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/BlogPost.tsx`)
  const result = await graphql(
    `
      {
        allWordpressPost(limit: 10) {
          edges {
            node {
              id
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

  // Create blog posts pages.
  const edges = result.data.allWordpressPost.edges

  edges.forEach((edge, index) => {
    const previous = index === edges.length - 1 ? null : edges[index + 1].node
    const next = index === 0 ? null : edges[index - 1].node

    createPage({
      path: edge.node.slug,
      component: blogPost,
      context: {
        slug: edge.node.slug,
        previous,
        next,
      },
    })
  })
}
