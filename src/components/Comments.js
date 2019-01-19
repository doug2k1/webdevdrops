import React from 'react'
import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  constructor(props) {
    super(props)
    this.state = { show: false }
    this.loadComments = this.loadComments.bind(this)
  }

  loadComments() {
    const { url, id } = this.props

    window.disqus_config = function() {
      this.page.url = url
      this.page.identifier = id
    }

    const d = document
    const s = d.createElement('script')
    s.src = 'https://web-dev-drops.disqus.com/embed.js'
    s.setAttribute('data-timestamp', +new Date())
    ;(d.head || d.body).appendChild(s)

    this.setState({ show: true })
  }

  render() {
    return (
      <section
        style={{
          marginBottom: rhythm(2.5),
        }}
      >
        <h2>Comentários</h2>

        <div id="disqus_thread">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              className="btn"
              onClick={this.loadComments}
              disabled={this.state.show}
            >
              {this.state.show ? 'Carregando...' : 'Mostrar comentários'}
            </button>
          </div>
        </div>
      </section>
    )
  }
}

export default Bio
