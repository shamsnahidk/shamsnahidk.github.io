export interface SiteMeta {
  siteUrl: string
  siteName: string
  title: string
  description: string
  author: string
  firstName: string
  lastName: string
  username: string
  locale: string
  themeColor: string
  ogImage: string
  ogImageAlt: string
  twitterHandle?: string
}

export const siteMeta: SiteMeta = {
  siteUrl: 'https://shamsnahidk.github.io',
  siteName: 'Shams Nahid K — Portfolio',
  title: 'Shams Nahid K — Software Developer · Backend & Full-Stack',
  description:
    'Shams Nahid K — Software Developer in Chicago. Resilient backend services, distributed systems, and full-stack products in Python, Java, React, gRPC.',
  author: 'Shams Nahid K',
  firstName: 'Shams',
  lastName: 'Nahid',
  username: 'shamsnahidk',
  locale: 'en_US',
  themeColor: '#0F172A',
  ogImage: 'https://shamsnahidk.github.io/og-image.png',
  ogImageAlt:
    'Shams Nahid K — Software Developer. Backend services, distributed systems, and full-stack products.',
}
