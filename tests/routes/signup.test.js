const app = require("../../app");
const supertest = require("supertest");
const User = require("../../models/User");

require('../initDb');

const SAMPLE_DATA = {
    email: 'first@gmail.com',
    password: 'password',
    googleId: '123456',
    facebookId: '987654'
};

// Sign Up Email
describe('POST /signup    Sign up with Email', () => {
    const API_URL = '/signup';

    it("Should create a user.", async () => {
        const res = await supertest(app)
            .post(API_URL)
            .send({
                email: SAMPLE_DATA.email,
                password: SAMPLE_DATA.password
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(true);
        expect(res.body.email).toEqual(SAMPLE_DATA.email);
        expect(res.body).toHaveProperty('token');
    });


    it("Should be a validation error.", async () => {
        const res = await supertest(app)
            .post(API_URL)
            .send({
                email: SAMPLE_DATA.email,
                password: ''
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(false);
        expect(res.body.message).toEqual('Validation error.');
    });


    it("Should not create a same user.", async () => {
        await User.create({
            email: SAMPLE_DATA.email,
            password: SAMPLE_DATA.password
        });

        const res = await supertest(app)
            .post(API_URL)
            .send({
                email: SAMPLE_DATA.email,
                password: SAMPLE_DATA.password
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(false);
        expect(res.body.message).toEqual('Already exists.');
    });
});


// Sign Up Google
describe('POST /signup-google    Sign up with Google', () => {
    const API_URL = '/signup-google';

    it("Should create a user.", async () => {
        const res = await supertest(app)
            .post(API_URL)
            .send({
                email: SAMPLE_DATA.email,
                id: SAMPLE_DATA.googleId
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(true);
        expect(res.body.email).toEqual(SAMPLE_DATA.email);
        expect(res.body).toHaveProperty('token');
    });


    it("Should be a validation error.", async () => {
        const res = await supertest(app)
            .post(API_URL)
            .send({
                email: SAMPLE_DATA.email,
                id: ''
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(false);
        expect(res.body.message).toEqual('Validation error.');
    });


    it("Should not create a same user.", async () => {
        await User.create({
            email: SAMPLE_DATA.email,
            google: {
                email: SAMPLE_DATA.email,
                id: SAMPLE_DATA.googleId
            }
        });

        const res = await supertest(app)
            .post(API_URL)
            .send({
                email: SAMPLE_DATA.email,
                id: SAMPLE_DATA.googleId
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(false);
        expect(res.body.message).toEqual('Already exists.');
    });
});


// Sign Up Facebook
describe('POST /signup-facebook    Sign up with Facebook', () => {
    const API_URL = '/signup-facebook';

    it("Should create a user.", async () => {
        const res = await supertest(app)
            .post(API_URL)
            .send({
                email: SAMPLE_DATA.email,
                id: SAMPLE_DATA.facebookId
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(true);
        expect(res.body.email).toEqual(SAMPLE_DATA.email);
        expect(res.body).toHaveProperty('token');
    });


    it("Should be a validation error.", async () => {
        const res = await supertest(app)
            .post(API_URL)
            .send({
                email: SAMPLE_DATA.email,
                id: ''
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(false);
        expect(res.body.message).toEqual('Validation error.');
    });


    it("Should not create a same user.", async () => {
        await User.create({
            email: SAMPLE_DATA.email,
            google: {
                email: SAMPLE_DATA.email,
                id: SAMPLE_DATA.facebookId
            }
        });

        const res = await supertest(app)
            .post(API_URL)
            .send({
                email: SAMPLE_DATA.email,
                id: SAMPLE_DATA.facebookId
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(false);
        expect(res.body.message).toEqual('Already exists.');
    });
});