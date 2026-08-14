const express = require('express')
const router = express.Router()
const {  getPatientMeds, addPatientMeds, updatePatientMeds, deletePatientMeds, updatePatientMedsTimezoneOffset } = require('../controllers/medsController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getPatientMeds).post(protect, addPatientMeds).put(protect, updatePatientMeds).delete(protect, deletePatientMeds)
router.route('/timezone').put(protect, updatePatientMedsTimezoneOffset)



module.exports = router