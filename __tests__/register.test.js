process.env.NODE_ENV = 'test';

require('dotenv').config();

// const { connectDB } = require('../../../db/connectDB');

const mongoose = require('mongoose');

const connectDB = url => {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

const { User } = require('../models/user');
const app = require('../app');

const request = require('supertest');
const agent = request.agent('http://localhost:3001');
// const agent = request(app);

const { DB_HOST } = process.env;
const registerRoute = '/users/register';

describe('register controller', () => {
    const validUser = {
        email: 'testadmin@mail.com',
        password: 'AddPass123456',
    };
    let createdUser;

    beforeAll(async () => {
        // establish test-db connection
        await connectDB(DB_HOST);

        // seed db with user
        createdUser = await User.create(validUser);
    });

    afterAll(async () => {
        // remove created user
        await User.findByIdAndDelete(createdUser._id);
    });

    describe('body validation', () => {
        describe('email validation', () => {
            it('return 400 unauthorized, if email is not provided', async () => {
                const invalidData = { password: 'AddPass123456' };
                // const res = await agent.post('/register').send({ /* тело запроса без email */ });

                const res = await agent.post(registerRoute).send(invalidData);
                expect(res.status).toEqual(400);
            });

            it('return 400 unauthorized, if email is not a valid email', async () => {
                const invalidData = { email: 'testtest' };

                const res = await agent.post(registerRoute).send(invalidData);
                expect(res.status).toEqual(400);
            });
        });

        // describe('password validation', () => {
        //     it('return 400 unauthorized, if password is not provided', async () => {
        //         const invalidData = { email: 'test@mail.com' };
        //         const res = await request(app)
        //             .post(registerRoute)
        //             .send(invalidData);

        //         expect(res.status).toEqual(400);
        //     });

        //     it('return 400 unauthorized, if password is not valid', async () => {
        //         // at least 8 char, one number, one uppercase letter
        //         const invalidData = {
        //             email: 'test@mail.com',
        //             password: 'admin',
        //         };
        //         const res = await request(app)
        //             .post(registerRoute)
        //             .send(invalidData);

        //         expect(res.status).toEqual(400);
        //     });
        // });
    });

    // describe('registration', () => {
    //     let registeredUser;

    //     it('return 409 if email is not unique', async () => {
    //         const res = await request(app)
    //             .post(registerRoute)
    //             .send({ email: validUser.email, password: validUser.password });

    //         expect(res.status).toEqual(409);
    //     });

    //     it('return 201, and created user if body is valid, and email is unique', async () => {
    //         const uniqueUser = {
    //             email: 'test1@mail.com',
    //             password: 'Admin123',
    //         };

    //         const res = await request(app).post(registerRoute).send(uniqueUser);

    //         expect(res.status).toEqual(201);
    //         expect(res.body.user.email).toEqual(uniqueUser.email);

    //         registeredUser = res.body.user;
    //     });

    //     afterAll(async () => {
    //         // delete registered user from db
    //         await User.findByIdAndDelete(registeredUser._id);
    //     });
    // });
});
