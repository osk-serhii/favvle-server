// Load the module dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        match: [/.+\@.+\..+/, "Please fill a valid email address"]
    },
    password: {
        type: String,
        required: false
    },
    google: {
        email: {
            type: String,
            lowercase: true,
            match: [/.+\@.+\..+/, "Please fill a valid email address"]
        },
        id: {
            type: String
        }
    },
    facebook: {
        email: {
            type: String,
            lowercase: true,
            match: [/.+\@.+\..+/, "Please fill a valid email address"]
        },
        id: {
            type: String
        }
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// Use a pre-save middleware to hash the password
UserSchema.pre('save', function (next) {
    const user = this;

    if (this.isModified('password') || (this.isNew && this.password)) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);

                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

// Create method to compare password input to password saved in database
UserSchema.methods.comparePassword = function (password, next) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) {
            return next(err);
        }
        next(null, isMatch);
    });
};

// Create the 'User' model out of the 'UserSchema'
module.exports = mongoose.model('User', UserSchema);
