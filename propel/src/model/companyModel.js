const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId


const companyCardSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim : true
        
    },
    designation:{
        type : String,
        required: true,
        trim : true
    },

    companyName: {
        type: String,
        required: true,
        trim : true
    },
    contactNumber:{
        type:Number,
        required: true,
        trim : true,
        unique : true
    },
    emailId :{
        type: String,
        required: true,
        unique : true,
        trim : true
    },
    websiteUrl : {
        type: String,
        required: true
    },
    socialLink:{
        type: [String],
        required: true,
        trim: true
    },
    
    companyLogo:{
        type:String,
        required:true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


module.exports = mongoose.model('companyCards ', companyCardSchema)