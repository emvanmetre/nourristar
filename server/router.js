import { Router } from 'express'
const router = Router()
import { Users } from './schemas'

router.post('/post', async (req, res) => {
  const { username, password } = req.body
  const userData = { username: username, password: password }
  const newUsers = new Users(userData)
  const saveUsers = await newUsers.save()
  if (saveUsers) {
    res.send('Component successfully saved!')
  }
  res.end()
})

router.get('/Nourristar', async (req, res) => {
  const users = schemas.Users

  const userData = await users.find({}).exec()
  if (userData) {
    res.send(JSON.stringify(userData))
  }
  res.end()
})

export default router
