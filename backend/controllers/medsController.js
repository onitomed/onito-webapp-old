const asyncHandler = require('express-async-handler')
const formdata = require('form-data')
const datastoreToken = process.env.DATASTORE_ACCESS_TOKEN
const datastoreUrl = process.env.DATASTORE_URL

const PatientMeds = require('../models/medsModel')


//  @desc    Get patient medicines
//  @route   GET /api/patientmeds
//  @access  Private
const getPatientMeds = asyncHandler(async (req, res) => {
    const patientMeds = await PatientMeds.findOne({patientId:req.patient.id})
    if(patientMeds)
        res.status(200).json(patientMeds)
    else {
        res.status(400)
        throw new Error('Patient medicines not found')
    }
})

//  @desc    Add patient medicines
//  @route   POST /api/patientmeds
//  @access  Private
const addPatientMeds = asyncHandler(async (req, res) => {
    const { name, type, time, days, genericName } = req.body

    // Form validation
    if(!name || !time) {
        res.status(400)
        throw new Error("Please add all fields")
    }
    const patientMeds = await PatientMeds.findOne({patientId:req.patient.id})
    if (!patientMeds) {
        const newMeds = await PatientMeds.create({
            patientId: req.patient.id,
            medicines: [{
                name,
                type,
                time,
                days,
                genericName}
            ]
        })
        res.status(201).json(newMeds)
    }
    else {
        const newMeds = await PatientMeds.findOneAndUpdate(
            {patientId: req.patient.id},
            { "$push": { "medicines": {name,time,type,days,genericName} } },
            { "new": true })
        res.status(201).json(newMeds)
    } 
})

//  @desc    Update patient medicines
//  @route   PUT /api/patientmeds
//  @access  Private
const updatePatientMeds = asyncHandler(async (req, res) => {
    const { medId, name, type, time, days, genericName } = req.body

    // Form validation
    if(!medId) {
        res.status(400)
        throw new Error("Please specify medicine by medicine ID")
    }
    else {
        let patientMeds = await PatientMeds.findOne({patientId:req.patient.id})
        if(patientMeds) {
            let med = patientMeds.medicines.find((el)=> el.id==medId)
            if (med) {
                if (name!=null && name!=med.name)
                    med.name=name
                if (type!=null && type!=med.type)
                    med.type=type
                if (time!=null && time!=med.time)
                    med.time=time
                if (days!=null && days!=med.days)
                    med.days=days
                if (genericName!=null && genericName!=med.genericName)
                    med.genericName=genericName
                patientMeds.medicines.pull(medId)
                patientMeds.medicines.push(med)
                const newMeds = await PatientMeds.findOneAndUpdate(
                    {patientId: req.patient.id},
                    {medicines: patientMeds.medicines},
                    { returnDocument: 'after' })
                res.status(201).json(newMeds)
            }
            else {
                res.status(400)
                throw new Error(`${medId} medicine not found`)
            }
                
        }
        else {
            res.status(400)
            throw new Error('No medicines found')
        }
    }
})

//  @desc    Delete patient medicines
//  @route   DELETE /api/patientmeds
//  @access  Private
const deletePatientMeds = asyncHandler(async (req, res) => {
    const { deleteAll, medId } = req.body
    if (!deleteAll && !medId) {
        res.status(400)
        throw new Error('No medicines to delete')
    }
    else {
        const p = await PatientMeds.findOne({patientId:req.patient.id})
        if (p) {
            if (deleteAll) {
                const patientMeds = await PatientMeds.findOneAndDelete({patientId: req.patient.id})
                res.status(200).json(patientMeds)
            }
            else {
                let med = p.medicines.find((el)=> el.id==medId)
                p.medicines.pull(medId)
                const newMeds = await PatientMeds.findOneAndUpdate(
                    {patientId: req.patient.id},
                    {medicines: p.medicines},
                    { returnDocument: 'after' })
                res.status(201).json(newMeds)
            }
        }
        else {
            res.status(400)
            throw new Error('Patient medicines not found')
        }
    }
})

module.exports = {
    getPatientMeds,
    addPatientMeds,
    updatePatientMeds,
    deletePatientMeds
}