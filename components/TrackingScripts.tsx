import Script from 'next/script'

export function TrackingScripts() {
  if (process.env.NODE_ENV !== 'production') {
    return null
  }

  return (
    <>
      <Script src="/js/gtm.js" />
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-KQPDQCS"
          height="0"
          width="0"
          className="invisible hidden"
        ></iframe>
      </noscript>
    </>
  )
}
