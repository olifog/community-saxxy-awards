const host = process.env.VERCEL_ENV === 'production'
  ? 'https://saxxys.com'
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://localhost:3000'

module.exports = {
  siteUrl: host,
  generateRobotsTxt: true,
  exclude: [
    '/server-sitemap.xml',
    '/user/submissions',
    '/user/submissions/new'
  ],
  robotsTxtOptions: {
    additionalSitemaps: [
      `${host}/server-sitemap.xml`
    ]
  }
}
