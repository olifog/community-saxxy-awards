const dev = (process.env.NODE_ENV || 'development') === 'development'
const prod = process.env.VERCEL_ENV === 'production'
const host = dev
  ? 'http://localhost:3000'
  : prod
    ? 'https://saxxys.com'
    : `https://${process.env.VERCEL_URL}`

module.exports = {
  siteUrl: host,
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [
      `${host}/server-sitemap.xml`
    ]
  }
}
