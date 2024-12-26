import Script from 'next/script'

export function TrackingScripts() {
  if (process.env.NODE_ENV !== 'production') {
    return null
  }

  return (
    <>
      <Script
        src="https://cloud.umami.is/script.js"
        data-website-id="c9e4b240-da8a-4f0e-8b15-a4946642731b"
        defer
      />
    </>
  )
}
