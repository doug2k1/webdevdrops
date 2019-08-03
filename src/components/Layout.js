import React from 'react'
import { Link } from 'gatsby'
import { rhythm, scale } from '../utils/typography'
import '../assets/styles.css'
import Footer from './Footer'

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    const isRootPath = location.pathname === rootPath
    const pageNumber = location.pathname
      .split('/')
      .filter(Boolean)
      .pop()
    const isPaginatedPath = pageNumber && Boolean(pageNumber.match(/^[0-9]+$/))
    let header

    if (isRootPath || isPaginatedPath) {
      header = (
        <h1
          style={{
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              color: 'inherit',
              boxShadow: 'none',
              textDecoration: 'none',
            }}
            to={'/'}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: 'Montserrat, sans-serif',
            marginTop: 0,
            marginBottom: rhythm(-1),
          }}
        >
          <Link
            style={{
              color: '#245E28',
              boxShadow: 'none',
              textDecoration: 'none',
            }}
            to={'/'}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        {header}
        {children}
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Footer />
      </div>
    )
  }
}

export default Layout
