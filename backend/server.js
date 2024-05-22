const dotenv = require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const connectDB = require('./Config/dbConfig')
const {errorHandler} = require('./Middleware/errorHandlerMiddleware')

connectDB()

app.use(cors())

app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb', extended: true}))

// initialCredential
app.use('/initialCredential', require('./Routes/AdminManagement/comp_prov_Route'))


// All Procedures Routes
app.use('/allProcedures', require('./Routes/AdminManagement/allProcedureRoute'))

// Accounts Reports

// General Management
app.use('/Level1/', require('./Routes/GeneralManagement/Level1Route'))
app.use('/Level2/', require('./Routes/GeneralManagement/Level2Route'))
app.use('/Level3/', require('./Routes/GeneralManagement/Level3Route'))
app.use('/Parties/', require('./Routes/GeneralManagement/PartiesInformationRoute'))

// Stock Management
// app.use('/Item/', require('./Routes/StockManagement/itemRoute'))
// app.use('/Purchase/', require('./Routes/StockManagement/purchaseDORoute'))
// app.use('/Sales/', require('./Routes/StockManagement/counterSalesRoute'))
// app.use('/WholeSales/', require('./Routes/StockManagement/wholeSalesRoute'))

// Auth Routes
app.use('/users/', require('./Routes/Payroll/employeeRoute'))
app.use('/menus/', require('./Routes/AdminManagement/menuRoute'))

app.use(errorHandler)

app.listen(process.env.PORT, ()=>{console.log(`Server is running on port ${process.env.PORT}`)})