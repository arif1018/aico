const asyncHandler = require('express-async-handler')

const getUser = asyncHandler(async (req, res, next)=>{

    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]
            req.user = token
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized!...')
        }
                
    }
    if(!token){
        res.status(401)
        throw new Error('No Token, Not Authorized!...')
    }
    
})

const checkAdministrator = asyncHandler(async (req, res, next)=>{

    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]
            req.userRole = token.split('-')[0]
            req.user = token.split('-')[1]
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized!...')
        }
                
    }
    if(!token){
        res.status(401)
        throw new Error('No Token, Not Authorized!...')
    }
    
})

const protect = asyncHandler( async (req, res, next) => {

    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]
            req.userid = token.split('/')[0]
            req.EntDate = token.split('/')[1]
            next()
        } catch (error) {
            res.status(401)
            throw new Error('Not Authorized!...')
        }
                
    }
    if(!token){
        res.status(401)
        throw new Error('No Token, Not Authorized!...')
    }
})

module.exports = { protect, checkAdministrator, getUser }