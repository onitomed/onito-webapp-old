const express = require('express')
const router = express.Router()
// const { getPatient, addPatient, updatePatient, deletePatient, getPatientsForUser, addPatientAccess, getSelf } = require('../controllers/patientController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getSelf).post(protect, addPatient).delete(protect, deletePatient).put(protect, updatePatient)

module.exports = router