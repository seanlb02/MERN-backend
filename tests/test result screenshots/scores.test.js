import supertest from 'supertest'
import request from 'supertest';
import landingRoutes from '../routes/landing_routes'
import {app} from '../app';

// This test token was valid for the period of testing and will become invalid after 5/02/2023
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNlYW5zZWFuIiwiaWF0IjoxNjc1NTY3NjAzLCJleHAiOjE2NzU2NTQwMDN9.aP3-Tp0sKfHbN0tmJVUja0B7VK_FkXo9WNKq-iGvKwY"


describe("Return an array of all user scores (objects)", () => {
    test('GET /all', async () => {
        const res = await request(app).get('/scores/all')
        .set('Accept', 'application/json')
        .set('Authorization', `bearer ${token}`)
        expect(res.status).toBe(200)
    }) 
}) 

describe("Return an array of users last wellbeing score", () => {
    test('GET /latest', async () => {
        const res = await request(app).get('/scores/latest')
        .set('Accept', 'application/json')
        .set('Authorization', `bearer ${token}`)
        expect(res.status).toBe(200)
    }) 
}) 

describe("Return users last months worth of wellbeing scores", () => {
    test('GET /month', async () => {
        const res = await request(app).get('/scores/month')
        .set('Accept', 'application/json')
        .set('Authorization', `bearer ${token}`)
        expect(res.status).toBe(200)
    }) 
}) 

describe("Store new wellbeing score", () => {
    test('POST /scores/new', async () => {
        const res = await request(app)
        .post('/scores/new')
        .send({"timestamp": "timestamp", "score": "score"})
        .set('Accept', 'application/json')
        .set('Authorization', `bearer ${token}`)
        expect(res.status).toBe(200)
    })
})