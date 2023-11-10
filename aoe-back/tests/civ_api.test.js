const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const civs = require('../utils/civstats')
const api = supertest(app)
const Civ = require('../schemas/civ')

beforeEach(async () => {
  await Civ.deleteMany({})
  const iterciv = civs.civilizations
  for(let c of iterciv) {
    let civObj = new Civ(c)
    await civObj.save()
  }

})

test('/api/civ works', async () => {
  await api
    .get('/api/civs')
    .expect(200)
})

test('get with id', async () => {
  const res = await api.get(`/api/civs/1`).expect(200)
  expect(res.body).toHaveLength(1)
  expect(res.body[0].name).toEqual("Britons")
})

test('powerunit correct', async () => {
  const res = await api.get(`/api/civs/powerunit/1`).expect(200)
  expect(res.body.unit).toEqual("archer")
})

