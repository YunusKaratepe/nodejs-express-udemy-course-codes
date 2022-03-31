const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOne, userOneId, setupDatabase } = require('./fixtures/db')


beforeEach(setupDatabase)

test('+ Sign up a new user', async () => {
    const response = await request(app).post('/users').send({
        name: "Yunus Karatepe",
        email: "yunuskara@test.com",
        password: "yunustestpw"
    }).expect(201)

    // assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name: "Yunus Karatepe",
            email: "yunuskara@test.com",
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe('yunustestpw')
})

test('+ Login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(response.body.user._id)
    expect(response.body.token).toBe(user.tokens[1].token)

})

test('- Login not existing user', async () => {
    await request(app).post('/users/login').send({
        email: "notexistingemail@test.com",
        password: "notexisting"
    }).expect(400)
})

test('+ Get profile for authenticated user', async () => {
    await request(app).get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)    
        .send()
        .expect(200)
})

test('- Get profile for unauthenticated user', async () => {
    await request(app).get('/users/me')
        .send()
        .expect(401)
})

test('+ Delete authenticated users account', async () => {
    await request(app).delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('- Delete unauthorized users account', async () => {
    await request(app).delete('/users/me')
        .send()
        .expect(401)
})

test('+ Upload avatar image', async () => {
    await request(app).post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('+ Update authenticated users name', async () => {
    const response = await request(app).patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({ name: "updated test" })
        .expect(200)

    const user = await User.findById(userOneId)

    expect(user.name).toEqual('updated test')
})

test('- Update unauthenticated users name', async () => {
    await request(app).patch('/users/me')
        .send({ name: "updated test" })
        .expect(401)

    const user = User.findById(userOneId)
    expect(user.name).not.toEqual('updated test')
})
