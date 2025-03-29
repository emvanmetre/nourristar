import { Router } from 'express'
const router = Router()
import { Component } from '../models/schemas'

router.post('/post', async (req, res) => {
  const { name, id, html, css, js } = req.body
  const componentData = { name: name, id: id, html: html, css: css, js: js }
  const newComponent = new Component(componentData)
  const saveComponent = await newComponent.save()
  if (saveComponent) {
    res.send('Component successfully saved!')
  }
  res.end()
})

router.get('/Nourristar', async (req, res) => {
  const components = schemas.Component

  const componentData = await components.find({}).exec()
  if (componentData) {
    res.send(JSON.stringify(componentData))
  }
  res.end()
})

export default router