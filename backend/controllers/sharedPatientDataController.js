const asyncHandler = require('express-async-handler')
const { getPdfFromDatastore } = require('../services/datastoreService')
const jwt = require('jsonwebtoken')

const getShareLink = asyncHandler(async (req, res) => {
    let token = ''
    if (req.data) {
        if (data.duration)
            token = generateToken(req.user.id, duration)
    }
    else
        token = generateToken(req.user.id)
    const urlToken = Buffer.from(token).toString('base64url')
    res.status(200).json({link: `${urlToken}`})
})
const getSharedPatientData = asyncHandler(async (req, res) => {
    const token = Buffer.from(req.params.id, 'base64url').toString()
    userId=jwt.verify(token, process.env.JWT_SECRET).id
    const response = ''
    try {
        const base64Pdf = await getPdfFromDatastore(userId)
        res.contentType("application/pdf")
        res.setHeader( "Content-Disposition", "inline")
        res.status(200).send(base64Pdf)
    } catch (err) {
        res.status(500)
        throw new Error(err.toString())
    }
})

const generateToken = (id, duration='24h') => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: duration,
    })
}

module.exports = {
    getShareLink,
    getSharedPatientData
}