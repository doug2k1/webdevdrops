module.exports = {
  siteMetadata: {
    title: `Web Dev Drops`,
    author: {
      name: `Douglas Matoso`,
      summary: `Desenvolvedor web`,
    },
    description: `Dicas e tutoriais sobre desenvolvimento web`,
    siteUrl: `https://www.webdevdrops.com`,
    social: {
      twitter: `webdevdrops`,
    },
  },
  plugins: [
    /* {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    }, */
    /* {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    }, */
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          `gatsby-remark-reading-time`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    /* {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    }, */
    // `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `static/images/webdevdrops-icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    `gatsby-plugin-styled-components`,
    // {
    //   resolve: `gatsby-source-wordpress`,
    //   options: {
    //     baseUrl: `www.webdevdrops.com`,
    //     protocol: `https`,
    //     hostingWPCOM: false,
    //     useACF: false,
    //     includedRoutes: ["**/posts", "**/tags", "**/media"],
    //   },
    // },
    {
      resolve: `gatsby-source-wordpress-experimental`,
      options: {
        url: process.env.WPGRAPHQL_URL || `https://webdevdrops.local/graphql`,
        verbose: true,
        develop: {
          hardCacheMediaFiles: true,
        },
        html: {
          useGatsbyImage: true,
          imageQuality: 80,
          imageMaxWidth: 1400,
        },
        debug: {
          graphql: {
            writeQueriesToDisk: true,
          },
        },
        type: {
          Post: {
            limit:
              process.env.NODE_ENV === `development`
                ? // Lets just pull 50 posts in development to make it easy on ourselves.
                  50
                : // and we don't actually need more than 5000 in production for this particular site
                  5000,
          },
        },
      },
    },
  ],
}
