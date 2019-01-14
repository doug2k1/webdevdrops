import React from 'react'
import Layout from '../components/Layout'

class NotFoundPage extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <h1>Página não encontrada</h1>
        <p>Ops! Esta página não existe.</p>
      </Layout>
    )
  }
}

export default NotFoundPage
