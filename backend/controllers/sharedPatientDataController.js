const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const getShareLink = asyncHandler(async (req, res) => {
    
    if (req.data.duration)
        res.status(200).json()
})
const getSharedPatientData = asyncHandler(async (req, res) => {})

const generateToken = (id, duration='24h') => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: duration,
    })
}

module.exports = {
    getShareLink,
    getSharedPatientData
}