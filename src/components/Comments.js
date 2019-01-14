import React from 'react'
import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <section
        style={{
          marginBottom: rhythm(2.5),
        }}
      >
        <h2>Comentários</h2>
        <p>
          Estamos em processo de migração. Os comentários serão habilitados em
          breve.
        </p>
      </section>
    )
  }
}

export default Bio
