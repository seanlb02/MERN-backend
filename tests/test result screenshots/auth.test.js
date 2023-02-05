import supertest from 'supertest'
import request from 'supertest';
import landingRoutes from '../routes/landing_routes'
import {app} from '../app';


describe("Landing page rendering test", () => {
    test('GET /', async () => {
        const res = await request(app).get('/')
        expect(res.status).toBe(200)
    })
})

describe("User auth routes", () => {
    test('POST /auth/register', async () => {
        const res = await request(app)
        .post('/auth/register')
        .send({email: 'toby@hotmail.com', user: 'toby', pwd: 'password'})
        .set('Accept', 'application/json')
        expect(res.status).toBe(200)
    })
})

describe("User auth routes", () => {
  test('POST /auth/login', async () => {
      const res = await request(app)
      .post('/auth/login')
      .send({ usr: 'john', pwd: 'password'})
      .set('Accept', 'application/json')
      expect(res.status).toBe(200)
  })
})