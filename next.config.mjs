import createBuildAnalyzer from '@next/bundle-analyzer'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/libs/i18n/request.ts')
const withBundleAnalyzer = createBuildAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {}

export default withBundleAnalyzer(withNextIntl(nextConfig))
