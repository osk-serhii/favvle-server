const app = require("../../app");
const supertest = require("supertest");
const User = require("../../models/User");

require('../initTest');

const SAMPLE_DATA = {
    first: {
        email: 'first@gmail.com',
        password: 'password',
        googleId: '123456',
        facebookId: '987654'
    },
    second: {
        email: 'second@gmail.com',
        password: 'second-password',
        googleId: '111111',
        facebookId: '222222'
    }
};

// Sign in Email
describe('POST /signin    Sign in with Email', () => {
    const API_URL = '/signin';

    it("Should be signed in.", async () => {
        // Create an user
        await User.create({
            email: SAMPLE_DATA.first.email,
            password: SAMPLE_DATA.first.password
        });

        // Send request
        const res = await supertest(app)
            .post(API_URL)
            .send({
                email: SAMPLE_DATA.first.email,
                password: SAMPLE_DATA.first.password
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(true);
        expect(res.body.email).toEqual(SAMPLE_DATA.first.email);
        expect(res.body).toHaveProperty('token');
    });


    it("Should be failed because of not registered user.", async () => {
        const res = await supertest(app)
            .post(API_URL)
            .send({
                email: SAMPLE_DATA.second.email,
                password: SAMPLE_DATA.second.email
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(false);
        expect(res.body.message).toEqual('Authentication failed.');
    });


    it("Should be failed because of incorrect password.", async () => {
        const res = await supertest(app)
            .post(API_URL)
            .send({
                email: SAMPLE_DATA.first.email,
                password: SAMPLE_DATA.second.password
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(false);
        expect(res.body.message).toEqual('Authentication failed.');
    });
});


// Sign in Google
describe('POST /signin    Sign in with Google', () => {
    const API_URL = '/signin-google';

    it("Should be signed in.", async () => {
        // Create an user
        await User.create({
            email: SAMPLE_DATA.first.email,
            google: {
                email: SAMPLE_DATA.first.email,
                id: SAMPLE_DATA.first.googleId
            }
        });

        // Send request
        const res = await supertest(app)
            .post(API_URL)
            .send({
                email: SAMPLE_DATA.first.email,
                id: SAMPLE_DATA.first.googleId
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(true);
        expect(res.body.email).toEqual(SAMPLE_DATA.first.email);
        expect(res.body).toHaveProperty('token');
    });


    it("Should be failed because of not registered user.", async () => {
        const res = await supertest(app)
            .post(API_URL)
            .send({
                email: SAMPLE_DATA.second.email,
                id: SAMPLE_DATA.second.googleId
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(false);
        expect(res.body.message).toEqual('Authentication failed.');
    });


    it("Should be failed because of incorrect email and app id.", async () => {
        const res = await supertest(app)
            .post(API_URL)
            .send({
                email: SAMPLE_DATA.first.email,
                id: SAMPLE_DATA.second.googleId
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(false);
        expect(res.body.message).toEqual('Authentication failed.');
    });
});


// Sign in Facebook
describe('POST /signin    Sign in with Facebook', () => {
    const API_URL = '/signin-facebook';

    it("Should be signed in.", async () => {
        // Create an user
        await User.create({
            email: SAMPLE_DATA.first.email,
            facebook: {
                email: SAMPLE_DATA.first.email,
                id: SAMPLE_DATA.first.facebookId
            }
        });

        // Send request
        const res = await supertest(app)
            .post(API_URL)
            .send({
                email: SAMPLE_DATA.first.email,
                id: SAMPLE_DATA.first.facebookId
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(true);
        expect(res.body.email).toEqual(SAMPLE_DATA.first.email);
        expect(res.body).toHaveProperty('token');
    });


    it("Should be failed because of not registered user.", async () => {
        const res = await supertest(app)
            .post(API_URL)
            .send({
                email: SAMPLE_DATA.second.email,
                id: SAMPLE_DATA.second.facebookId
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(false);
        expect(res.body.message).toEqual('Authentication failed.');
    });


    it("Should be failed because of incorrect email and app id.", async () => {
        const res = await supertest(app)
            .post(API_URL)
            .send({
                email: SAMPLE_DATA.first.email,
                id: SAMPLE_DATA.second.facebookId
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(false);
        expect(res.body.message).toEqual('Authentication failed.');
    });
});