const asyncHandler = require('express-async-handler')
const axios = require('axios')
const formdata = require('form-data')
const fs = require('fs')
const path = require('path')
const PDFDocument = require('pdf-lib').PDFDocument
const datastoreToken = process.env.DATASTORE_ACCESS_TOKEN
const datastoreUrl = process.env.DATASTORE_URL

const PatientData = require('../models/patientDataModel')


//  @desc    Get patient data
//  @route   GET /api/patientdata
//  @access  Private
const getPatientData = asyncHandler(async (req, res) => {
    const patientDataCollection = await PatientData.find({user: req.user.id})
    if (patientDataCollection.length==0) {
        res.status(400)
        throw new Error('User not found')
    }
    else {
        try {
            const response = await axios({
                method: 'get',
                url: patientDataCollection[0].link,
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${datastoreToken}` },})
        
            res.contentType("application/pdf")
            res.setHeader( "Content-Disposition", "inline")
            res.status(200).send(response.data.content)
            
        
        } catch (err) {
            res.status(500)
            throw new Error(err.toString())
        }
    }
})


//  @desc    Add patient data
//  @route   POST /api/patientdata
//  @access  Private
const addPatientData = asyncHandler(async (req, res) => {
    let fileUploaded = false
    if (!req.files || Object.keys(req.files).length === 0) {
        fileUploaded = false 
    }
    else {
        fileUploaded = true
        file = req.files.dataFile
        if (!fs.readdirSync(path.resolve(__dirname,'..')).includes('temp'))
            fs.mkdirSync(path.resolve(__dirname,'../temp'))
        uploadPath = path.resolve(__dirname,`../temp/${req.user.id}_new.pdf`)
        file.mv(uploadPath, (err) => {
            if (err) {
                res.status(500)
                throw new Error('error in file upload')
            }
        })
    }

    const patientDataCollection = await PatientData.find({user: req.user.id})
    if (patientDataCollection.length == 0) {
        let fileBase64
        if (fileUploaded) {
            const pdfBuffer1 = fs.readFileSync(path.resolve(__dirname,'../public/startpage.pdf')) 
            const pdfBuffer2 = fs.readFileSync(path.resolve(__dirname,`../temp/${req.user.id}_new.pdf`))
            const pdfsToMerge = [pdfBuffer2, pdfBuffer1]
            const mergedPdf = await PDFDocument.create() 
            for (const pdfBytes of pdfsToMerge) { 
                const pdf = await PDFDocument.load(pdfBytes); 
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => {
                    mergedPdf.addPage(page)
                })
            }
            fileBase64 = await mergedPdf.saveAsBase64()
            
        }
        else {
            fileBase64 = Buffer.from(fs.readFileSync(path.resolve(__dirname,'../public/startpage.pdf'))).toString('base64')
        }
        const data = {
            "branch": "main",
            "commit_message": `Added PDF for user ${req.user.id}`,
            "actions": [{
                "action": "create",
                "file_path": `${req.user.id}.pdf`,
                "content": fileBase64,
                "encoding": "base64",
                "author_email": "onitomed@gmail.com",
                "author_name": "Noorul Ali",
            },]
        } 
        await axios({
            method: 'post',
            url: datastoreUrl+'/repository/commits',
            data: data,
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${datastoreToken}` },}, (err,response) =>  {
                if (err) {
                    res.status(500)
                    throw new Error(err.toString())
                }
        })
        const dlink = `${datastoreUrl}/repository/files/${req.user.id}%2Epdf?ref=main`
        const patientData = await PatientData.create({
            user: req.user,
            link: dlink,
        })
        res.status(200).json(patientData)
        const directory = path.resolve(__dirname,'../temp')
        for (const file of fs.readdirSync(directory)) {
            if (file.includes(req.user.id))
                fs.unlinkSync(path.resolve(directory,file))
        }
        
    }
    else {
        try {
            const response = await axios({
                method: 'get',
                url: patientDataCollection[0].link,
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${datastoreToken}` },})
            if (!fs.readdirSync(path.resolve(__dirname,'..')).includes('temp')) {
                fs.mkdirSync(path.resolve(__dirname,'../temp'))
            }
            fs.writeFileSync(path.resolve(__dirname,`../temp/${req.user.id}_old.pdf`),response.data.content,'base64')
            if (fileUploaded) {
                const pdfBuffer1 = fs.readFileSync(path.resolve(__dirname,`../temp/${req.user.id}_old.pdf`)) 
                const pdfBuffer2 = fs.readFileSync(path.resolve(__dirname,`../temp/${req.user.id}_new.pdf`))
                const pdfsToMerge = [pdfBuffer2, pdfBuffer1]
                const mergedPdf = await PDFDocument.create() 
                for (const pdfBytes of pdfsToMerge) { 
                    const pdf = await PDFDocument.load(pdfBytes); 
                    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                    copiedPages.forEach((page) => {
                        mergedPdf.addPage(page)
                    })
                }
                fileBase64 = await mergedPdf.saveAsBase64()
                const data = {
                    "branch": "main",
                    "commit_message": `Updated PDF for user ${req.user.id}`,
                    "actions": [{
                        "action": "update",
                        "file_path": `${req.user.id}.pdf`,
                        "content": fileBase64,
                        "encoding": "base64",
                        "author_email": "onitomed@gmail.com",
                        "author_name": "Noorul Ali",
                    },]
                } 
                await axios({
                    method: 'post',
                    url: datastoreUrl+'/repository/commits',
                    data: data,
                    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${datastoreToken}` },}, (err,response) =>  {
                        if (err) {
                            res.status(500)
                            throw new Error(err.toString())
                        }
                })
            }
            
        } catch (err) {
            res.status(500)
            throw new Error(err.toString())
        }
        
        const patientData = await PatientData.findOneAndUpdate({user: req.user.id}, {updatedAt: Date.now}, {new: true})
        res.status(200).json(patientData)
        const directory = path.resolve(__dirname,'../temp')
        for (const file of fs.readdirSync(directory)) {
            if (file.includes(req.user.id))
                fs.unlinkSync(path.resolve(directory,file))
          }
        
        
    }
        
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
    const patientDataCollection = await PatientData.find({user: req.user.id})
    if (!patientDataCollection.length == 0) {
        const data = {
            "branch": "main",
            "commit_message": `Deleted PDF for user ${req.user.id}`,
            "actions": [{
                "action": "delete",
                "file_path": `${req.user.id}.pdf`,
                "author_email": "onitomed@gmail.com",
                "author_name": "Noorul Ali",
            },]
        } 
        await axios({
            method: 'post',
            url: datastoreUrl+'/repository/commits',
            data: data,
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${datastoreToken}` },}, (err,response) =>  {
                if (err) {
                    res.status(500)
                    throw new Error(err.toString())
                }
        })
        const patientData = await PatientData.findOneAndDelete({user: req.user.id})
        res.status(200).json(patientData)
    }
    

    else {
        res.status(400)
        throw new Error('User data not found')
    }

    
})

module.exports = {
    getPatientData,
    addPatientData,
    updatePatientData,
    deletePatientData
}