const express = require('express')
const router = express.Router()
const { getPatient, addPatient, updatePatient, deletePatient, getPatientsForUser } = require('../controllers/patientController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getPatient).post(protect, addPatient).delete(protect, deletePatient).put(protect, updatePatient)
router.route('/user').get(protect, getPatientsForUser)

module.exports = router