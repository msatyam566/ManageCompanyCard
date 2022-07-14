const express = require('express')
const router = express.Router()

const companyController = require("../controller/companyController")

//=========API============//

router.post('/business-card',companyController.createCompanyCard)
router.get('/business-card/:id',companyController.getCompanyCardDetails)

module.exports = router;