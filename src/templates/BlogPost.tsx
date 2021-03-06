import React, { FC, useEffect } from "react"
import { Link, graphql } from "gatsby"
import {
  FaClock,
  FaCalendarAlt,
  FaRocket,
  FaGraduationCap,
} from "react-icons/fa"
import Prism from "prismjs"
import Bio from "../components/bio"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { rhythm, scale } from "../utils/typography"
import styled from "styled-components"
import SidebarLink from "../components/SidebarLink"
import { themeColor } from "../styles/vars"
import PostTranslations from "../components/PostTranslations"

interface Props {
  data: any
  pageContext: any
}

const H1 = styled.h1`
  margin-bottom: 0;
`

const ArticleContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 250px;
  column-gap: ${rhythm(1)};
`

const Article = styled.main`
  border-top: 5px solid ${themeColor};
  background: #fff;
  box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.1);
  padding: ${rhythm(2)};
`

const BlogPost: FC<Props> = ({ data, pageContext }) => {
  const post = data.allWpPost.nodes[0]
  const postDate = new Date(post.date).toLocaleDateString("pt-BR")
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <Layout title={siteTitle}>
      <SEO title={post.title} description={post.excerpt} />
      <ArticleContainer>
        <Article>
          <header>
            <H1>{post.title}</H1>
            <p
              style={{
                ...scale(-1 / 6),
                display: `flex`,
                alignItems: "center",
                marginBottom: rhythm(1),
              }}
            >
              <FaCalendarAlt />
              <span style={{ margin: "0 16px 0 5px" }}>{postDate}</span>
              <FaClock />
              <span style={{ marginLeft: "5px" }}>
                Leitura: {Math.ceil(post.readingTime.minutes)} min.
              </span>
            </p>
          </header>

          {post.translations && (
            <PostTranslations translations={post.translations} />
          )}

          <section dangerouslySetInnerHTML={{ __html: post.content }} />
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
          <footer>
            <Bio />
          </footer>
        </Article>

        <aside>
          <SidebarLink
            icon={<FaRocket size={24} />}
            text="Pacote Full-Stack"
            url="https://go.hotmart.com/H11987895V?ap=7cc1&src=sidebarfs"
          />
          <SidebarLink
            icon={<FaGraduationCap size={24} />}
            text="Cursos Danki Code"
            url="https://go.hotmart.com/H11987895V?src=sidebarcursos&pad=https://cursos.dankicode.com/"
          />
        </aside>
      </ArticleContainer>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.slug} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.slug} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allWpPost(limit: 1, filter: { slug: { eq: $slug } }) {
      nodes {
        id
        slug
        title
        date
        excerpt
        content
        translations {
          slug
          language {
            slug
          }
        }
        readingTime {
          minutes
        }
      }
    }
  }
`
