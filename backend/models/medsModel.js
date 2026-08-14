const mongoose = require('mongoose')
const medSchema = mongoose.Schema({
    type: { type: String, default: "medicine" },
    time: { type: Number, required: [true, 'Please add time to take medicine'],  min: [0, 'Input time between 00:00 and 23:59'], max: [2359, 'Input time between 00:00 and 23:59']  },
    name: { type: String, required: [true, 'Please add medicine name'] },
    genericName: String,
    days: {type: [String], default: ["all"],
    duration: {type: String, default: "daily"}
    }
})
const medsSchema = mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please add a patient ID'],
        ref: 'Patient',
    },
    medicines: [medSchema],
    timezoneOffset: { type: Number, default: 5.5 }
})

module.exports = mongoose.model('PatientMeds', medsSchema)