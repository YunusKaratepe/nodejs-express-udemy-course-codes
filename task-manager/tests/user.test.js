const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const userOne = {
    name: "test test",
    email: "test@test.com",
    password: "?16test16?"
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('+ Sign up a new user', async () => {
    await request(app).post('/users').send({
        name: "Yunus Karatepe",
        email: "yunuskara@test.com",
        password: "yunustestpw"
    }).expect(201)
})

test('+ Login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('- Login not existing user', async () => {
    await request(app).post('/users/login').send({
        email: "notexistingemail@test.com",
        password: "notexisting"
    }).expect(400)
})
