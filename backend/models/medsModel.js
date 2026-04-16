const mongoose = require('mongoose')
const medSchema = mongoose.Schema({
    type: { type: String, default: "medicine" },
    time: { type: Number, required: [true, 'Please add time to take medicine'] },
    name: { type: String, required: [true, 'Please add medicine name'] },
    genericName: String,
    days: {type: [String], default: ["all"]}
})
const medsSchema = mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please add a patient ID'],
        ref: 'Patient',
    },
    medicines: [medSchema]
})

module.exports = mongoose.model('PatientMeds', medsSchema)