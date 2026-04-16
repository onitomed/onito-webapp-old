const mongoose = require('mongoose')
// schema for each page range in reports
// docSchema classifies each document (fileName)
// pages between [startIndex, endIndex) are labeled with strings [classifiers]

const docSchema = mongoose.Schema({
    fileName: String,
    startIndex: Number,
    endIndex: Number,
    classifiers: [String]
})
const patientDataIndexSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please add a user ID'],
        ref: 'User',
    },
    index: [docSchema]
}, {
    timestamps: true
})

module.exports = mongoose.model('PatientDataIndex', patientDataIndexSchema)