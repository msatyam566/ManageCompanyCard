const companyModel = require('../model/companyModel')
const validation = require('../validation/validator')
const aws = require('../aws/aws');



//==============================Creating a Company card===================================//

const createCompanyCard = async(req,res)=>{
    try {
        let cardDetails = req.body;
        let files = req.files
        let {name,designation,companyName,contactNumber,emailId,websiteUrl,socialLink}=cardDetails

        //====================Validations start=================================//

        if (!validation.isValidDetails(cardDetails)) {
            return res.status(400).send({ status: false, message: "please provide cardDetails" })
        }

        
        if (!validation.isValidValue(name)) {
            return res.status(400).send({ status: false, messege: "please provide name" })
        }
        
        if (!validation.isValidValue(designation)) {
            return res.status(400).send({ status: false, messege: "please provide designation" })
        }
        if (!validation.isValidValue(companyName)) {
            return res.status(400).send({ status: false, messege: "please provide companyName" })
        }

        //=======================validations and dublicate check for phone number======================//

        if (!validation.isValidValue(contactNumber)) {
            return res.status(400).send({ status: false, messege: "please provide contactNumber" })
        }
        if(!validation.isvalidContact(contactNumber)){
            return res.status(400).send({status:false,msg:"please provide valid phone number "})
        }

        let duplicateNumber = await companyModel.findOne({ contactNumber })
        if (duplicateNumber) {
            return res.status(400).send({ status: false, message: "This phone number already exists" })
        }

        //===========================validations and dublication check for email======================================//

        if (!validation.isValidValue(emailId)) {
            return res.status(400).send({ status: false, messege: "please provide emailId" })
        }
    
        let isDuplicateEmail = await companyModel.findOne({ emailId })
        if (isDuplicateEmail) {
            return res.status(400).send({ status: false, message: "This email already exists" })
        }

        //===========================validations check for website url===============================================//

        if(!validation.isValidUrl(websiteUrl)){
            return res.status(400).send({status:false,msg:"please provide valid url "})
        }

        if (!validation.isValidValue(websiteUrl)) {
            return res.status(400).send({ status: false, messege: "please provide websiteUrl" })
        }

        if (!validation.isValidValue(socialLink)) {
            return res.status(400).send({ status: false, messege: "please provide socialLink" })
        }


        //=========================validation for AWS=============================================================//

        if (!(files && files.length > 0)) {
            return res.status(400).send({ status: false, message: "Please provide your Logo image" })
        }
        companyLogo = await aws.uploadFile(files[0])


        //======================================Validations end here=============================================//

        const finalCardDetails = {name,designation,companyName,contactNumber,emailId,websiteUrl,socialLink,companyLogo}

        let savedCardDetails = await companyModel.create(finalCardDetails)
        return res.status(201).send({ status: true, msg: "card created successfully", data: savedCardDetails });
    
        
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


//=================================================Get Card Details=================================================//

const getCompanyCardDetails = async (req,res)=>{
try {
    const cardId = req.params.cardId

    //==================checking buisness cardId is valid or not======================//

    if (!validation.isValidObjectId(cardId)) {
        return res.status(400).send({ status: false, message: "cardId is invalid" });
    }

    const cardById = await companyModel.findById(cardId);

        if (!cardById) {
            return res.status(404).send({ status: false, message: 'No Card found with this Id ' });
        }

        return res.status(200).send({ status: true, message: "Card details", data: cardById });
    
    
} catch (error) {
    return res.status(500).send({ status: false, message: error.message })
}
}



module.exports={createCompanyCard,getCompanyCardDetails}