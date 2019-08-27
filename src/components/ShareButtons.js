import React from 'react'
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share'
import { rhythm } from '../utils/typography'
import styles from './ShareButton.module.scss'

const BTN_SIZE = 36

export default function ShareButtons({ url, title }) {
  return (
    <div style={{ marginBottom: rhythm(1) }}>
      <h2>Compartilhe!</h2>
      <div className={styles.btnRow}>
        <TwitterShareButton
          title={title}
          via="webdevdrops"
          url={url}
          className={styles.btn}
        >
          <TwitterIcon size={BTN_SIZE} round />
        </TwitterShareButton>
        <FacebookShareButton quote={title} url={url} className={styles.btn}>
          <FacebookIcon size={BTN_SIZE} round />
        </FacebookShareButton>
        <LinkedinShareButton url={url} className={styles.btn}>
          <LinkedinIcon size={BTN_SIZE} round />
        </LinkedinShareButton>
        <TelegramShareButton title={title} url={url} className={styles.btn}>
          <TelegramIcon size={BTN_SIZE} round />
        </TelegramShareButton>
        <WhatsappShareButton title={title} url={url} className={styles.btn}>
          <WhatsappIcon size={BTN_SIZE} round />
        </WhatsappShareButton>
      </div>
    </div>
  )
}
