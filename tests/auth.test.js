import supertest from 'supertest'
import request from 'supertest';
import landingRoutes from '../routes/landing_routes'

describe("auth tests", () => {
    test('GET /', () => {
        const res = request(landingRoutes).get('/')
        expect(res.status).toBe(200)
        console.log(res.status)
   
    })
})