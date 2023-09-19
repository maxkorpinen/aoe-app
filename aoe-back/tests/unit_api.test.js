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

test('findall', async() => {
  const res = await api.get('/api/units/')

  expect(res.body).toHaveLength(units.length)
})

test('/api/units call works', async() => {
  await api
  .get('/api/units')
  .expect(200)
})

afterAll(async () => {
  await mongoose.connection.close()
})