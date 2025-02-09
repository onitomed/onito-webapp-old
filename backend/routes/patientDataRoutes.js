const express = require('express')
const router = express.Router()
const { getPatientData, addPatientData, updatePatientData, deletePatientData } = require('../controllers/patientDataController')
const { getShareLink, getSharedPatientData } = require('../controllers/sharedPatientDataController') 

const { protect } = require('../middleware/authMiddleware')
const { route } = require('./userRoutes')

router.route('/').get(protect, getPatientData).post(protect, addPatientData).delete(protect, deletePatientData)
router.route('/share').get(protect, getShareLink)
router.route('/share/:token').get(getSharedPatientData)

module.exports = router