const User = require('../models/User');
const jwt = require('jsonwebtoken');

/**
 * Email signin process
*/
exports.signinEmail = async function (req, res) {
    // Check if user exists
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) console.log(err);

        if (!user || !user.password) { // if not user exists or user signed up with social network
            res.json({
                success: false,
                message: 'Authentication failed.'
            });
        } else {
            user.comparePassword(req.body.password, function (err, isMatch) { // check if password is correct
                if (isMatch && !err) {
                    res.json({
                        success: true,
                        email: user.email,
                        token: createToken(user.email)
                    });
                } else {
                    res.send({
                        success: false,
                        message: 'Authentication failed.'
                    });
                }
            });
        }
    });
}

/**
 * Google signin process
*/
exports.signinGoogle = async function (req, res) {
    const { email, id } = req.body;
    // Check if user exists
    User.findOne({
        google: {
            email: email,
            id: id
        }
    }, function (err, user) {
        if (err) console.log(err);

        if (!user) { // if not user exists
            res.json({
                success: false,
                message: 'Authentication failed.'
            });
        } else {
            res.json({
                success: true,
                email: email,
                token: createToken(email)
            });
        }
    });
}

/**
 * Facebook signin process
*/
exports.signinFacebook = async function (req, res) {
    const { email, id } = req.body;
    // Check if user exists
    User.findOne({
        facebook: {
            email: email,
            id: id
        }
    }, function (err, user) {
        if (err) console.log(err);

        if (!user) { // if not user exists
            res.json({
                success: false,
                message: 'Authentication failed.'
            });
        } else {
            res.json({
                success: true,
                email: email,
                token: createToken(email)
            });
        }
    });
}

/**
 * Email signup process
*/
exports.signupEmail = function (req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        res.json({
            success: false,
            message: 'Validation error.'
        });
    } else {
        User.findOne({ email }, function(err, user) {
            if (err) {
                console.log(err);
            } else {
                if (user) {
                    return res.json({
                        success: false,
                        message: 'Already exists.'
                    });
                }

                if (!user) {
                    const newUser = new User({
                        email,
                        password
                    });
                    newUser.save(function(err, user) {
                        if (err || !user) console.log(err);

                        res.json({
                            success: true,
                            email: user.email,
                            token: createToken(user.email)
                        });
                    });
                }
            }
        });
    }
};

/**
 * Google signup process
*/
exports.signupGoogle = function (req, res) {
    const { email, id } = req.body;
    if (!email || !id) {
        res.json({
            success: false,
            message: 'Validation error.'
        });
    } else {
        User.findOne({ email: email }, function(err, user) {
            if (err) {
                console.log(err);
            } else {
                if (user) {
                    return res.json({
                        success: false,
                        message: 'Already exists.'
                    })
                }

                if (!user) {
                    const newUser = new User({
                        email,
                        google: {
                            email: email,
                            id: id
                        }
                    });
                    newUser.save(function(err, user) {
                        if (err || !user) console.log(err);

                        res.json({
                            success: true,
                            email: email,
                            token: createToken(email)
                        });
                    });
                }
            }
        });
    }
};

/**
 * Facebook signup process
*/
exports.signupFacebook = function (req, res) {
    const { email, id } = req.body;
    if (!email || !id) {
        res.json({
            success: false,
            message: 'Validation error.'
        });
    } else {
        User.findOne({ email: email }, function(err, user) {
            if (err) {
                console.log(err);
            } else {
                if (user) {
                    return res.json({
                        success: false,
                        message: 'Already exists.'
                    })
                }

                if (!user) {
                    const newUser = new User({
                        email,
                        facebook: {
                            email: email,
                            id: id
                        }
                    });
                    newUser.save(function(err, user) {
                        if (err || !user) console.log(err);

                        res.json({
                            success: true,
                            email: user.email,
                            token: createToken(user.email)
                        });
                    });
                }
            }
        });
    }
};

// Create token for api authentication
const createToken = function (email) {
    return jwt.sign({
        data: email
    }, process.env.SESSION_SECRET, {
        expiresIn: process.env.SESSION_EXPIRES_IN
    });
}