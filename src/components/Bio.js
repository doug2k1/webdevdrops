import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTwitter,
  faGithub,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from './profile-pic.jpg'
import { rhythm } from '../utils/typography'

const links = [
  { icon: faTwitter, alt: 'Twitter', url: 'https://twitter.com/doug2k1' },
  { icon: faGithub, alt: 'GitHub', url: 'https://github.com/doug2k1' },
  {
    icon: faLinkedin,
    alt: 'LinkedIn',
    url: 'https://www.linkedin.com/in/douglasmatoso',
  },
]

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
        <img
          src={profilePic}
          alt={`Douglas Matoso`}
          style={{
            borderRadius: '50%',
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
          }}
        />
        <div>
          <p style={{ margin: 0 }}>
            Por <strong>Douglas Matoso</strong>, desenvolvedor frontend.
            <br />
            {links.map(({ icon, alt, url }) => (
              <a
                href={url}
                target="_blank"
                style={{
                  color: 'inherit',
                  boxShadow: 'none',
                  fontSize: 20,
                  marginRight: 10,
                }}
              >
                <FontAwesomeIcon icon={icon} alt={alt} />
              </a>
            ))}
          </p>
        </div>
      </div>
    )
  }
}

export default Bio
