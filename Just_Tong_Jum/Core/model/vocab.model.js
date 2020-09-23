const mongoose = require('mongoose')

const VocabSchema = mongoose.Schema({
    groupVocabId: String,
    firstText: String,
    secondText: String,
    thirdText: String,
    forthText: String,
    vocabOrder: Number,
    check: Boolean
}, {
    //timestamps: true
})

// const VocabSchema = mongoose.Schema({
//     name: String,
//     meaning: String
// }, {
//     timestamps: true
// })

module.exports = mongoose.model('Vocab', VocabSchema)