const mongoose = require('mongoose')

const ProfileSchema = mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    surname: String
}, {
    timestamps: false
})

module.exports = mongoose.model('Profile', ProfileSchema)