import { authHandlers } from '../handlers'
import { authOptions } from '../options'
import { TFastify } from '../types'

export async function authRoutes(app: TFastify) {
  app.post('/login', authOptions.postSession, async (req, reply) => {
    const { password, username } = req.body
    await authHandlers.postSession({username, password, reply})
  })
}
