import React from 'react'
import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <section
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
        <h2>Comentários</h2>
      </section>
    )
  }
}

export default Bio
