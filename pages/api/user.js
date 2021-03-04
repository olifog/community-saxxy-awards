import nextConnect from 'next-connect'
import auth from '../../middleware/auth'

const handler = nextConnect()

handler
  .use(auth)
  .get((req, res) => {
    console.log(req)
    //console.log(res)
    res.json({req: req})
  })

export default handler