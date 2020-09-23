const mongoose = require('mongoose')

const GroupVocabsSchema = mongoose.Schema({
    userId: String,
    groupName: String,
    firstLabel: String,
    secondLabel: String,
    thirdEnable: Boolean,
    forthEnable: Boolean,
    thirdLabel: String,
    forthLabel: String,
    groupOrder: Number,
    titleNumber: Number,
    subtitleNumber: Number
}, {
        //timestamps: false
    })

// const GroupVocabsSchema = mongoose.Schema({
//     firstLabel: String,
//     secondLabel: String,
//     words: [{firstText: String, secondText: String, check: Boolean}]
// }, {
//     timestamps: false
// })

// const GroupVocabsSchema = mongoose.Schema(

//     EngBasic1 = {
//         firstLabel: 'Eng',
//         secondLabel: 'TH',
//         words: [{ firstText: 'Cat', secondText: 'แมว', check: false },
//         { firstText: 'Dog', secondText: 'หมา', check: false },
//         { firstText: 'Fish', secondText: 'ปลา', check: false }]
//     },

//     EngBasic2 = {
//         firstLabel: 'Eng',
//         secondLabel: 'TH',
//         words: [{ firstText: 'Cow', secondText: 'วัว', check: false },
//         { firstText: 'ฺBird', secondText: 'นก', check: false },
//         { firstText: 'Human', secondText: 'คน', check: false }]
//     },

//     JPBasic1 = {
//         firstLabel: 'JP',
//         secondLabel: 'TH',
//         words: [{ firstText: 'Neko', secondText: 'แมว', check: false },
//         { firstText: 'Inu', secondText: 'หมา', check: false },
//         { firstText: 'Sakana', secondText: 'ปลา', check: false }]
//     },
    
    
//     {
//         timestamps: false
//     })


module.exports = mongoose.model('GroupVocabs', GroupVocabsSchema)