const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Patient = require('../models/patientModel')
const User = require('../models/userModel')

//  @desc    Get patient
//  @route   GET /api/patient
//  @access  Private
const getPatient = asyncHandler(async (req, res) => {
    if (!req.patient || !req.patient.id) {
        res.status(400)
        throw new Error("No token with patient ID")
    }
    const patient = await Patient.findById(req.patient.id)
    if (patient) {
        res.status(200).json(patient)
    }
    else {
        res.status(400).json('Patient not found')
    }
})

//  @desc    Add patient
//  @route   POST /api/patient
//  @access  Private
const addPatient = asyncHandler(async (req, res) => {
    const { name, dependent } = req.body
    const userId = req.user.id
    if(dependent==null || !name || !userId) {
        res.status(400)
        throw new Error("Please add all fields")
    }
    let patient = null
    if (dependent) {
        patient = await Patient.create({
            name,
            dependent,
            root: false,
            users: [req.user.id]
        })
    }
    else {
        patient = await Patient.create({
            name,
            dependent,
            root: true,
            users: [req.user.id]
        })
    }
    if (patient) {
        res.status(201).json({
            _id: patient._id,
            name: patient.name,
            root: patient.root,
            token: generateToken(req.user.id,patient._id),
            users: patient.users
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid patient data')
    }

})

//  @desc    Update patient
//  @route   PUT /api/patient
//  @access  Private
const updatePatient = asyncHandler(async (req, res) => {
    const patient = await Patient.findById(req.patient.id)

    if(!patient) {
        res.status(400)
        throw new Error('Patient not found')
    }

    const updatedPatient = await Patient.findByIdAndUpdate(req.patient.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedPatient)
})

//  @desc    Delete patient
//  @route   DELETE /api/patient
//  @access  Private
const deletePatient = asyncHandler(async (req, res) => {
    const p = await Patient.findById(req.patient.id)
    if (p) {
        const patient = await Patient.findByIdAndDelete(req.patient.id)
        res.status(200).json(patient)
    }
    else {
        res.status(400)
        throw new Error('Patient object not found')
    }

})

//  @desc    Get all patients for user ID
//  @route   GET /api/patient/user
//  @access  Private
const getPatientsForUser = asyncHandler(async (req, res) => {
    if (!req.user.id) {
        res.status(400)
        throw new Error("No token")
    }
    const patients = await Patient.find({users: req.user.id})
    let p = []
    if (patients) {
        
        patients.forEach(patient => {
            t = {'name': patient.name, 'id':patient.id, 'dependent':patient.dependent, 'root':patient.root}
            p.push(t)       
        });
        res.status(200).json(p)
    }
    else {
        res.status(400).json('No patients found')
    }
})

//  @desc    Give patient access to user
//  @route   POST /api/patient/user
//  @access  Private
const addPatientAccess = asyncHandler(async (req, res) => {
    const patient = await Patient.findById(req.patient.id)

    if(!patient) {
        res.status(400)
        throw new Error('Patient not found')
    }

    const updatedPatient = await Patient.findByIdAndUpdate(req.patient.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedPatient)
})

const generateToken = (id,pid) => {
    return jwt.sign({ id,pid }, process.env.JWT_SECRET, {
        expiresIn: '24h',
    })
}



module.exports = {
    getPatient,
    addPatient,
    updatePatient,
    deletePatient,
    getPatientsForUser,
}