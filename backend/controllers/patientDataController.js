const asyncHandler = require('express-async-handler')

const PatientData = require('../models/patientDataModel')

//  @desc    Get patient data
//  @route   GET /api/patientdata
//  @access  Private
const getPatientData = asyncHandler(async (req, res) => {
    const patientDataCollection = await PatientData.find({user: req.user.id})


    res.status(200).json(patientDataCollection)
})

//  @desc    Create patient data
//  @route   POST /api/patientdata
//  @access  Private
const createPatientData = asyncHandler(async (req, res) => {
    if(!req.body.link) {
        res.status(400)
        throw new Error("Please enter link")
    }
    if(!req.user) {
        res.status(401)
        throw new Error('Unauthorized')
    }

    const patientData = await PatientData.create({
        user: req.user,
        link: req.body.link,
    })

    res.status(200).json(patientData)
})

//  @desc    Update patient data
//  @route   PUT /api/patientdata/:id
//  @access  Private
const updatePatientData = asyncHandler(async (req, res) => {
    const patientData = await PatientData.findById(req.params.id)

    if(!patientData) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const updatedPatientData = await PatientData.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedPatientData)
})

//  @desc    Delete patient data
//  @route   DELETE /api/patientdata/:id
//  @access  Private
const deletePatientData = asyncHandler(async (req, res) => {
    const patientData = await PatientData.findByIdAndRemove(req.params.id)

    if(!patientData) {
        res.status(400)
        throw new Error('Goal not found')
    }

    await patientData.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getPatientData,
    createPatientData,
    updatePatientData,
    deletePatientData
}