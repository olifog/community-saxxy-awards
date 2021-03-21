import { getServerSideSitemap } from 'next-sitemap'

const dev = (process.env.NODE_ENV || 'development') === 'development'
const prod = process.env.VERCEL_ENV === 'production'
const host = dev
  ? 'http://localhost:3000'
  : prod
    ? 'https://saxxys.com'
    : `https://${process.env.VERCEL_URL}`

export async function getServerSideProps (ctx) {
  const staticPages = [
    {
      loc: host,
      lastmod: new Date().toISOString()
    },
    {
      loc: `${host}/rules`,
      lastmod: new Date().toISOString()
    },
    {
      loc: `${host}/enter`,
      lastmod: new Date().toISOString()
    }
  ]

  const users = await fetch(`${host}/api/users`).then((r) => r.json())
  const submissions = await fetch(`${host}/api/submissions`).then((r) => r.json())

  const userPages = users.users.map((user) => (
    {
      loc: `${host}/user/${user}`,
      lastmod: new Date().toISOString()
    }
  ))
  const submissionPages = submissions.submissions.map((submission) => (
    {
      loc: `${host}/submission/${submission}`,
      lastmod: new Date().toISOString()
    }
  ))

  const pages = [...staticPages, ...userPages, ...submissionPages]
  return getServerSideSitemap(ctx, pages)
}

const Comp = () => {}
export default Comp
