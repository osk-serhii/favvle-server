const app = require("../../app");
const supertest = require("supertest");
const User = require("../../models/User");

require('../initTest');

const SAMPLE_DATA = {
    email: 'first@gmail.com',
    password: 'password',
    googleId: '123456',
    facebookId: '987654'
};

describe('Save User', () => {
    it("Hashed password should be saved instead of real password", async () => {
        // Create an user
        const user = await User.create({
            email: SAMPLE_DATA.email,
            password: SAMPLE_DATA.password
        });

        expect(user.email).toEqual(SAMPLE_DATA.email);
        expect(user.password).not.toBe(SAMPLE_DATA.password);
    });

    
    it("Saved password should be compared correctly with original password.", async () => {
        // Create an user
        const user = await User.create({
            email: SAMPLE_DATA.email,
            password: SAMPLE_DATA.password
        });

        user.comparePassword(SAMPLE_DATA.password, (err, isMatch) => {
            expect(isMatch).toEqual(true);
        });
    });
});