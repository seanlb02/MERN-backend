import supertest from 'supertest'
import request from 'supertest';
import landingRoutes from '../routes/landing_routes'
import {app} from '../app';

// This test token was valid for the period of testing and will become invalid after 5/02/2023
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNlYW5zZWFuIiwiaWF0IjoxNjc1NTY3NjAzLCJleHAiOjE2NzU2NTQwMDN9.aP3-Tp0sKfHbN0tmJVUja0B7VK_FkXo9WNKq-iGvKwY"

describe("Return an array of all user journal entries (objects)", () => {
    test('GET /entries/all/', async () => {
        const res = await request(app).get('/entries/all')
        .set('Accept', 'application/json')
        .set('Authorization', `bearer ${token}`)
        expect(res.status).toBe(200)
    }) 
}) 

describe("Store new journal entry", () => {
    test('POST /entries/new', async () => {
        const res = await request(app)
        .post('/entries/new')
        .send({"username": "testaccount", "timestamp": "2023-02-04", "title": "title1", "text": "this is a test", "tags": "[happy, jovial]"})
        .set('Accept', 'application/json')
        .set('Authorization', `bearer ${token}`)
        expect(res.status).toBe(200)
    })
})

describe("Return an array of all tags posted today by a user", () => {
    test('GET /entries/tags/today', async () => {
        const res = await request(app).get('/entries/tags/today')
        .set('Accept', 'application/json')
        .set('Authorization', `bearer ${token}`)
        expect(res.status).toBe(200)
    }) 
}) 

describe("Return an array of all tags posted this month by a user", () => {
    test('GET /entries/tags/month', async () => {
        const res = await request(app).get('/entries/tags/month')
        .set('Accept', 'application/json')
        .set('Authorization', `bearer ${token}`)
        expect(res.status).toBe(200)
    }) 
}) 