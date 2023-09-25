const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const units = require('../utils/units')
const api = supertest(app)
const Unit = require('../schemas/unit')

beforeEach(async () => {
  await Unit.deleteMany({})
  for(let unit of units) {
    let unitObj = new Unit(unit)
    await unitObj.save()
  }
})

test('expect this to fail', async() => {
  expect(1).toEqual(2)
})

test('find all, length matches', async () => {
  const res = await api.get('/api/units/')
  expect(res.body).toHaveLength(units.length)
})

test('/api/units call works', async () => {
  await api
  .get('/api/units')
  .expect(200)
})

test('search unit with id', async () => {
const res = await api.get(`/api/units/1`)
  .expect(200)

expect(res.body[0].name).toEqual('militia')
})

afterAll(async () => {
  await mongoose.connection.close()
})